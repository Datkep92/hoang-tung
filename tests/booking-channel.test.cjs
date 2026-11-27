const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const script = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(x => x[1]).find(x => x.includes("track('booking_whatsapp_intent')"));
assert(script, 'booking channel code missing');
function setup(valid=true, clipboardWorks=true) {
  const values={fullname:'Nguyễn An',phone:'0901234567',seat:'1',pickup:'Sân bay Cam Ranh',drop:'Phan Rang',date:'2026-12-01',time:'10:30',note:'2 khách',quote:'Giá một chiều: 600.000đ','website-check':''};
  const nodes={}; for(const [id,value] of Object.entries(values)) nodes[id]={value, textContent:id==='quote'?value:'',hidden:true,select(){this.selected=true}};
  for(const id of ['send-wa','send-zalo','open-wa','open-zalo','copy-booking','status']) nodes[id]={hidden:true,addEventListener(type,fn){this.handler=fn},select(){this.selected=true}};
  nodes.booking={reportValidity:()=>valid}; const calls=[]; const clipboard=[];
  const context={document:{getElementById:id=>nodes[id]},window:{open:(...args)=>calls.push(args)},navigator:{clipboard:{writeText:async t=>{if(!clipboardWorks)throw Error('unavailable');clipboard.push(t)}}},track:()=>{},encodeURIComponent};
  vm.runInNewContext(script,context);return {nodes,calls,clipboard};
}
(async()=>{
  let x=setup(false);await x.nodes['send-wa'].handler();await x.nodes['send-zalo'].handler();assert.equal(x.calls.length,0);assert.equal(x.nodes['open-zalo'].hidden,true);
  x=setup();await x.nodes['send-wa'].handler();let u=new URL(x.calls[0][0]);assert.equal(u.origin,'https://wa.me');assert.equal(u.pathname,'/84522037037');let text=u.searchParams.get('text');for(const part of ['Nguyễn An','0901234567','Xe 7 chỗ','Sân bay Cam Ranh','Phan Rang','2026-12-01','10:30','2 khách','600.000đ'])assert(text.includes(part),part);assert.equal(x.nodes['open-wa'].href,u.href);assert.equal(x.nodes['open-wa'].hidden,false);
  await x.nodes['send-zalo'].handler();assert.equal(x.clipboard[0],text);assert.equal(x.nodes['open-zalo'].hidden,false);assert.match(x.nodes.status.textContent,/dán nội dung/);
  x=setup(true,false);await x.nodes['send-zalo'].handler();assert.equal(x.nodes['copy-booking'].hidden,false);assert.equal(x.nodes['open-zalo'].hidden,false);assert.match(x.nodes.status.textContent,/sao chép/);
  assert(html.includes('href="https://zalo.me/0522037037" id="open-zalo"'));assert(!html.includes('formsubmit.co/ajax/'));console.log('PASS: validation, WhatsApp number and content, Zalo copy and manual fallback');
})().catch(e=>{console.error(e);process.exitCode=1});
