const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c={document:{addEventListener(){}},console};vm.createContext(c);
for(const f of ['career-content.js','practice-data.js','career-practice-data.js','practice.js','career-practice.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const tasks=JSON.parse(JSON.stringify(c.CAREER_PRACTICE_DATA)),plans=JSON.parse(JSON.stringify(c.CAREER_CONTENT.tracks.product.plan));
assert.equal(tasks.length,12);assert.equal(new Set(tasks.map(t=>t.id)).size,12);
const slots=[];
for(let ch=0;ch<2;ch++){const ids=plans[ch].b.concat(plans[ch].s,[plans[ch].boss]);for(let level=2;level<=ids.length;level+=2)slots.push([ch+1,level,ids[level-1]]);}
assert.deepEqual(tasks.map(t=>[t.chapter,t.level,t.caseId]),slots);
assert.deepEqual(tasks.reduce((m,t)=>(m[t.format]=(m[t.format]||0)+1,m),{}),{ab:4,funnel:4,priority:4});
for(const t of tasks){
 assert.equal(t.track,'product');assert.ok(!c.PRACTICE_DATA.some(x=>x.id===t.id));
 for(const s of t.steps){
  assert.ok(s.explain.length>50);
  const st={selected:[],sequence:[],pairs:{}};assert.equal(c.practiceComplete(s,st),false);
  if(s.kind==='select'){assert.equal(s.count,1);assert.ok(s.options.some(o=>o.id===s.key[0]));st.selected=s.key.slice();}
  else{assert.equal(s.kind,'order');assert.deepEqual([...s.keys[0]].sort(),s.cards.map(x=>x.id).sort());st.sequence=s.keys[0].slice();}
  assert.ok(c.practiceCorrect(s,st));assert.ok(c.practiceComplete(s,st));
  if(s.kind==='select')st.selected=[s.options.find(o=>!s.key.includes(o.id)).id];else st.sequence.reverse();
  assert.equal(c.practiceCorrect(s,st),false);
 }
 const rows=t.artifacts.find(a=>a.kind==='table').rows;
 if(t.format==='funnel'){
  const values=rows.map(r=>r.slice(1).map(x=>Number(x.replaceAll(',',''))));
  const drops=values.slice(1).map((v,i)=>v[1]/values[i][1]*100-v[0]/values[i][0]*100);
  const min=Math.min(...drops);assert.equal(drops.filter(x=>Math.abs(x-min)<1e-8).length,1);
  assert.deepEqual(t.steps[0].key,['step'+(drops.indexOf(min)+1)]);assert.equal(drops.indexOf(min)+1,t.audit.largestDeclineStage);
 }else if(t.format==='priority'){
  const remaining=rows.map(r=>({id:r[0][0],score:+r[1]/+r[2],dep:r[3]})),order=[];
  while(remaining.length){const a=remaining.filter(r=>r.dep==='None'||order.includes(r.dep)).sort((a,b)=>b.score-a.score);assert.ok(a.length);assert.notEqual(a[0].score,a[1]?.score);order.push(a[0].id);remaining.splice(remaining.findIndex(r=>r.id===a[0].id),1);}
  assert.deepEqual(t.steps[0].keys,[order]);assert.deepEqual(order,t.audit.expectedOrder);
 }else{
  const numbers=s=>s.replaceAll(',','').replaceAll('−','-').match(/[+-]?\d+(?:\.\d+)?/g).map(Number);
  const interval=numbers(rows.find(r=>r[0].startsWith('95% CI'))[1]);assert.equal(interval[0],t.audit.lower);
  const max=numbers(rows.find(r=>r[0].startsWith('Allowed'))[1])[0];assert.equal(max,t.audit.guardMax);
  let before,after;
  if(t.caseId==='b23'){
   const a=numbers(rows.find(r=>r[0].startsWith('Control:'))[1]),b=numbers(rows.find(r=>r[0].startsWith('Treatment:'))[1]);before=a[1]/a[0]*100;after=b[1]/b[0]*100;
  }else [before,after]=numbers(rows.find(r=>r[0].includes('control → treatment'))[1]);
  assert.equal(before,t.audit.guardBefore);assert.equal(after,t.audit.guardAfter);
  const decision=interval[0]>0&&after-before<=max+1e-8?'launch':'hold';assert.deepEqual(t.steps[0].key,[decision]);
 }
}
// The hook itself must reject every out-of-scope track, chapter, mode and odd slot.
for(const [track,j] of Object.entries(c.CAREER_CONTENT.tracks)){
 c.CUR_TRACK=track;c.PLAN=j.plan;
 for(const ca of j.cases)for(const mode of ['camp','rand','skip','event']){
  const found=c.careerPracticeFor({c:ca,mode});const expected=track==='product'&&mode==='camp'&&tasks.some(t=>t.caseId===ca.id);
  assert.equal(!!found,expected,track+'/'+ca.id+'/'+mode);
 }
}
assert.equal(c.practiceMergeDone(['product-funnel-v1'],[tasks[0].id]).length,2);
console.log('PASS: exactly 12 even Product slots in chapters 1–2; four independent variants per format; all keys, incomplete/wrong answers, arithmetic, dependencies and out-of-scope guards.');
