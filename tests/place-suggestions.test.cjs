const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');

assert(!html.includes('list="places"'), 'native datalist still linked');
assert(!html.includes('<datalist'), 'datalist still present');
assert(html.includes('>Điểm đi<input'), 'pickup label not renamed');
assert(html.includes('>Điểm đến<input'), 'drop label missing');
for (const id of ['pickup', 'drop']) {
  assert(html.includes(`id="${id}-suggestions"`), `${id} suggestion box missing`);
  assert(html.includes(`aria-label="Gợi ý ${id === 'pickup' ? 'điểm đi' : 'điểm đến'}"`), `${id} suggestion label missing`);
}
assert(!html.includes('id="swap-route"'), 'swap button still visible');
assert(!html.includes('Đổi chiều đi'), 'swap text still visible');

const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(x => x[1]);
const booking = scripts.find(x => x.includes('const fold='));
assert(booking, 'booking script missing');
for (const needle of ['fold(p).includes(q)', "document.createElement('button')", "e.key==='Escape'", "e.target.closest('.booking-location')"]) {
  assert(booking.includes(needle), needle);
}
assert(!booking.includes('swap-route'), 'swap listener still present');

const msg = scripts.find(x => x.includes("track('booking_whatsapp_intent')"));
assert(msg, 'message script missing');
for (const label of ['Họ và tên: ', 'Số điện thoại: ', 'Loại xe: ']) {
  assert(!msg.includes("'" + label + "'"), label);
}

const foldSrc = booking.match(/const fold=[^;]+;/);
assert(foldSrc, 'fold helper missing');
const ctx = {};
vm.runInNewContext(foldSrc[0] + ';this.fold=fold;', ctx);
assert.equal(ctx.fold('Đà Lạt'), 'da lat');
assert.equal(ctx.fold('Vĩnh Hy'), 'vinh hy');
assert(ctx.fold('Phan Rang – Tháp Chàm').includes('phan rang'));
console.log('PASS: manual place entry with accent-insensitive suggestions, no swap button, no duplicate labels');
