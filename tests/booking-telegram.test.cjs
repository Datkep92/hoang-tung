const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const script = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(x => x[1]).find(x => x.includes("track('booking_whatsapp_intent')"));
assert(script, 'booking channel code missing');
const values = {fullname:'Nguyễn An',phone:'0901234567',seat:'1',pickup:'Sân bay Cam Ranh',drop:'Phan Rang',date:'2026-12-01',time:'10:30',note:'2 khách',quote:'Giá một chiều: 600.000đ','website-check':''};
function setup(opts = {}) {
  const nodes = {};
  for (const [id,value] of Object.entries(values)) nodes[id] = {value, textContent:id === 'quote' ? value : '', hidden:true, select(){this.selected = true}};
  for (const id of ['send-wa','send-zalo','send-tg','open-wa','open-zalo','copy-booking','status']) nodes[id] = {hidden:true, disabled:false, addEventListener(type,fn){this.handler = fn}, select(){this.selected = true}};
  nodes.booking = {reportValidity:() => opts.valid !== false};
  const requests = [];
  const fetch = async (url, init = {}) => {
    requests.push({url, init});
    if (url === 'https://ipwho.is/') return {json:async () => ({success:true, ip:'113.160.1.2', city:'Phan Rang', region:'Ninh Thuận', country:'Việt Nam', latitude:11.56, longitude:108.99})};
    if (opts.failTopic && url.includes('createForumTopic')) return {json:async () => ({ok:false, description:'topic denied'})};
    if (url.includes('createForumTopic')) return {json:async () => ({ok:true, result:{message_thread_id:77}})};
    if (url.includes('sendMessage')) return {json:async () => ({ok:true, result:{message_id:9}})};
    throw Error('unexpected fetch ' + url);
  };
  const context = {document:{getElementById:id => nodes[id]}, window:{open:() => {}, HATUNG_CONFIG:{telegramBot:'test-bot', telegramChat:'-100123'}}, navigator:{clipboard:{writeText:async () => {}}}, track:() => {}, encodeURIComponent, fetch};
  vm.runInNewContext(script, context);
  return {nodes, requests};
}
(async () => {
  let x = setup({valid:false});
  await x.nodes['send-tg'].handler();
  assert.equal(x.requests.length, 0);
  assert.equal(x.nodes['send-tg'].disabled, false);

  x = setup();
  await x.nodes['send-tg'].handler();
  assert.equal(x.nodes['send-tg'].disabled, false);
  assert.equal(x.requests.length, 3);
  assert.equal(x.requests[0].url, 'https://ipwho.is/');
  assert.match(x.requests[1].url, /createForumTopic$/);
  const topic = JSON.parse(x.requests[1].init.body);
  assert.equal(topic.chat_id, '-100123');
  assert.match(topic.name, /Đặt xe Nguyễn An.*2026-12-01/);
  assert.match(x.requests[2].url, /sendMessage$/);
  const msg = JSON.parse(x.requests[2].init.body);
  assert.equal(msg.message_thread_id, 77);
  for (const part of ['Nguyễn An','0901234567','Sân bay Cam Ranh','113.160.1.2','Phan Rang','11.56, 108.99']) assert(msg.text.includes(part), part);
  assert.match(x.nodes.status.textContent, /Đã gửi đơn qua Telegram/);

  x = setup({failTopic:true});
  await x.nodes['send-tg'].handler();
  assert.equal(x.requests.length, 3);
  assert.equal(JSON.parse(x.requests[2].init.body).message_thread_id, undefined);
  assert.match(x.nodes.status.textContent, /chưa cho tạo chủ đề/);

  assert(html.includes('id="send-tg"'));
  assert(html.includes('vị trí theo IP'));
  assert(!html.includes('formsubmit.co/ajax/'));
  console.log('PASS: Telegram button, one topic per order, IP location, topic-failure fallback');
})().catch(e => { console.error(e); process.exitCode = 1; });
