const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.CAREER_URL||'http://127.0.0.1:8000/';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox'],headless:true});
 try{
 const context=await browser.newContext({viewport:{width:375,height:812},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
 await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);await page.waitForFunction(()=>ui.loaded);await page.locator('#splash').waitFor({state:'detached'});
 await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});
 const tasks=await page.evaluate(()=>CAREER_PRACTICE_DATA);
 const tap=(a,id='')=>page.locator(`[data-pr-action="${a}"][data-pr-id="${id}"]`).first().tap();
 async function startLesson(track,id,mode='camp',legacy=false){
  return page.evaluate(({track,id,mode,legacy})=>{
   selectTrack(track);S=defaultState();S.rt=RESET_TAG;S.onb=S.onb2=true;S.gseen=[0,1];S.rv=false;STATES[TK]=S;ui.onb=null;ui.lvlUp=null;
   if(legacy)S.lx[id]={t:1,b:1};
   startCase(BYID[id],false,mode,true);ui.cur.stage='opts';render();return ui.cur.c.steps.length;
  },{track,id,mode,legacy});
 }
 async function firstTwo(n){
  for(let i=0;i<n;i++){
   await page.waitForFunction(()=>ui.cur.stage==='opts');const pos=await page.evaluate(()=>ui.cur.order.findIndex(i=>ui.cur.c.steps[ui.cur.step].options[i].ok));
   await page.locator('.opts .opt').nth(pos).tap();await page.locator('[onclick="nextTap()"]').tap();
  }
  assert.equal(await page.evaluate(()=>ui.cur.x.stage),'tone');
  const pos=await page.evaluate(()=>ui.cur.x.tOrder.findIndex(i=>ui.cur.x.L.tone.opts[i].ok));await page.locator('.lxopt').nth(pos).tap();
  await page.locator('[onclick="lxToBuild()"]').tap();
 }
 async function solve(task,wrong=false,edit=false){
  for(const [i,s] of task.steps.entries()){
   await tap('check');assert.ok(await page.locator('#pr-error').isVisible());assert.equal(await page.evaluate(()=>ui.practice.steps[ui.practice.index].checked),false);
   const order=await page.evaluate(()=>ui.practice.steps.map(st=>st.order.slice()));
   if(s.kind==='select'){
    const bad=s.options.find(o=>!s.key.includes(o.id)).id;
    if(edit){await tap('select',bad);await tap('select',bad);}
    await tap('select',wrong&&i===0?bad:s.key[0]);
   }else{
    if(edit){await tap('add',s.keys[0][0]);await tap('remove',s.keys[0][0]);}
    const ids=s.keys[0].slice();if(wrong&&i===0)[ids[0],ids[1]]=[ids[1],ids[0]];
    for(const id of ids)await tap('add',id);
   }
   assert.deepEqual(await page.evaluate(()=>ui.practice.steps.map(st=>st.order.slice())),order);
   await tap('check');assert.match(await page.locator('#pr-feedback').innerText(),wrong&&i===0?/Not quite/:/Correct/);
   await tap('next');
  }
 }
 for(const task of tasks){
  await firstTwo(await startLesson('product',task.caseId));
  assert.equal(await page.evaluate(()=>ui.view),'case');assert.equal(await page.evaluate(()=>ui.cur.x.stage),'careerPractice');
  assert.equal(await page.evaluate(()=>ui.practice.task.id),task.id);
  assert.ok(await page.getByText('Task 3 of 3',{exact:true}).isVisible());assert.equal(await page.getByText('Build the sentence',{exact:true}).count(),0);
  assert.equal(await page.locator('.practice input,.practice textarea').count(),0);
  const before=await page.evaluate(()=>({xp:S.xp,pts:JSON.stringify(S.pts),grades:PLAN.map((_,i)=>gradeScore(i))}));
  await solve(task,true,true);assert.match(await page.locator('#pr-result').innerText(),/Not quite/);
  assert.equal(await page.evaluate(()=>ui.cur.x.practiceTries),1);assert.equal(await page.evaluate(()=>S.xp),before.xp);
  assert.equal(await page.locator('[data-pr-action="lesson-finish"]').count(),0);
  await tap('retry');assert.equal(await page.evaluate(()=>ui.cur.x.practiceTries),1);assert.equal(await page.evaluate(()=>ui.practice.steps[0].checked),false);
  await solve(task,false,true);assert.match(await page.locator('#pr-result').innerText(),/Correct/);
  assert.equal(await page.evaluate(()=>S.xp),before.xp+3);
  assert.deepEqual(await page.evaluate(()=>({pts:JSON.stringify(S.pts),grades:PLAN.map((_,i)=>gradeScore(i))})),{pts:before.pts,grades:before.grades});
  assert.ok(await page.evaluate(id=>S.practiceDone.includes(id),task.id));assert.equal(await page.evaluate(id=>S.lx[id].b,task.caseId),1);
  assert.equal(await page.evaluate(id=>S.lx[id]['practice-'+ui.practice.task.id],task.caseId),1);
  const widths=await page.evaluate(()=>({w:innerWidth,root:document.documentElement.scrollWidth,app:document.getElementById('app').scrollWidth,c:document.getElementById('app').clientWidth}));
  assert.ok(widths.root<=widths.w&&widths.app<=widths.c+1,task.id+JSON.stringify(widths));
  await tap('lesson-finish');assert.equal(await page.evaluate(()=>ui.view),'levels');
  await page.waitForFunction(()=>!saving);
  await page.reload();await page.waitForFunction(()=>ui.loaded);await page.locator('#splash').waitFor({state:'detached'});
  assert.ok(await page.evaluate(id=>S.practiceDone.includes(id),task.id));assert.equal(await page.evaluate(id=>S.lx[id].b,task.caseId),1);
  console.log('PASS',task.id,'first two tasks, embedded task 3, wrong/edit/retry, +3 XP once, unchanged chapter points, mobile and reload');
 }
 // Already-earned sentence XP must not be re-awarded for a replacement; keep legacy flags and add its completion.
 const sample=tasks[0];await firstTwo(await startLesson('product',sample.caseId,'camp',true));
 const prior=await page.evaluate(()=>S.xp);await solve(sample);assert.equal(await page.evaluate(()=>S.xp),prior);assert.equal(await page.evaluate(()=>ui.practice.gain),0);
 await tap('lesson-finish');
 // Existing three-attempt skip behavior remains available without granting completion or XP.
 const orderTask=tasks.find(t=>t.format==='priority');await firstTwo(await startLesson('product',orderTask.caseId));const noGain=await page.evaluate(()=>S.xp);
 for(let i=1;i<=3;i++){await solve(orderTask,true);assert.equal(await page.evaluate(()=>ui.cur.x.practiceTries),i);if(i<3){assert.equal(await page.locator('[data-pr-action="lesson-finish"]').count(),0);await tap('retry');}}
 assert.equal(await page.evaluate(()=>S.xp),noGain);assert.equal(await page.evaluate(id=>S.practiceDone.includes(id),orderTask.id),false);
 await tap('lesson-finish');assert.equal(await page.evaluate(()=>ui.view),'levels');
 // Odd levels, chapter 3 onward, other tracks and random practice keep their original sentence task.
 for(const [track,id,mode] of [['product','b01','camp'],['product','b18','camp'],['dev','b03','camp'],['pm','b03','camp'],['an','b03','camp'],['ba','b03','camp'],['product','b03','rand']]){
  await firstTwo(await startLesson(track,id,mode));assert.equal(await page.evaluate(()=>ui.cur.x.stage),'build');assert.ok(await page.getByText('Build the sentence',{exact:true}).isVisible());
 }
 // Shared component still gives exactly the original three Additional tasks per track.
 for(const track of ['product','dev','pm','an','ba'])assert.equal(await page.evaluate(t=>practiceTasks(t).length,track),3);
 // A zero-XP legacy replacement completion also survives the existing cloud/local union.
 const union=await page.evaluate(id=>{const a=defaultState(),b=defaultState();a.xp=10;b.xp=20;a.practiceDone=[id];return better(a,b).practiceDone.includes(id);},sample.id);assert.ok(union);
 // Native keyboard operation inside a career order task.
 await page.setViewportSize({width:1200,height:900});await firstTwo(await startLesson('product',orderTask.caseId));
 for(const id of orderTask.steps[0].keys[0]){await page.locator(`[data-pr-action="add"][data-pr-id="${id}"]`).focus();await page.keyboard.press('Enter');}
 await page.locator('[data-pr-action="check"]').focus();await page.keyboard.press('Space');assert.match(await page.locator('#pr-feedback').innerText(),/Correct/);
 fs.mkdirSync('/tmp/product-career-practice',{recursive:true});await page.screenshot({path:'/tmp/product-career-practice/order.png'});
 assert.deepEqual(errors,[]);console.log('PASS: all 12 Product pilot slots; 3 formats, legacy awards, 3-attempt skip, keyboard/touch, reload, scoped controls and original Additional counts.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
