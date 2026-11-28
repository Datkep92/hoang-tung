const assert = require('node:assert/strict'), fs = require('node:fs');
const html = fs.readFileSync('index.html', 'utf8');

// Ô ghi chú: chỉ có chữ gợi ý, nhãn chuyển sang aria-label.
assert(html.includes('<label class="full"><textarea aria-label="Ghi chú thêm" class="notranslate" id="note" placeholder="Ghi chú thêm"'), 'note hint missing');
assert(!html.includes('<label class="full">Ghi chú thêm'), 'visible note label still present');
for (const bad of ['Mã chuyến bay, số khách, hành lý...', 'Flight number, passengers, luggage...', '항공편 번호, 승객 수, 수하물...', '航班号、乘客人数、行李…', '便名、人数、荷物…', 'Номер рейса, число пассажиров, багаж…']) {
  assert(!html.includes(bad), 'old note hint remains: ' + bad);
}
for (const good of ['"Ghi chú thêm"', '"Additional notes"', '"추가 메모"', '"补充说明"', '"追加メモ"', '"Дополнительные заметки"']) {
  assert(html.includes(good), 'new note hint missing: ' + good);
}

// Footer: bốn nút liên hệ có icon + chữ, chia đều.
const grid = html.match(/<div class="footer-contact-grid">([\s\S]*?)<\/div>/);
assert(grid, 'footer contact grid missing');
assert.equal((grid[1].match(/<a\b/g) || []).length, 4, 'footer must have four contact buttons');
assert.equal((grid[1].match(/<svg\b/g) || []).length, 4, 'every footer button needs an icon');
for (const label of ['Gọi', 'Zalo', 'WhatsApp', 'Email']) {
  assert(grid[1].includes('>' + label + '</span>'), 'footer label missing: ' + label);
}
const gridCss = html.match(/<style id="footer-contact-grid">([\s\S]*?)<\/style>/);
assert(gridCss && gridCss[1].includes('grid-template-columns:repeat(4,minmax(0,1fr))'), 'footer buttons are not evenly spaced');

assert(html.includes('<p class="footer-contact-detail notranslate" translate="no">Hotline 0522.037.037 · xehopdonghatung@gmail.com</p>'), 'hotline/email text lost');

// Dock: năm nút, mỗi nút có icon + chữ.
const dock = html.match(/<div class="dock">([\s\S]*?)<\/div>/);
assert(dock, 'dock missing');
assert.equal((dock[1].match(/<a\b/g) || []).length, 5, 'dock must have five buttons');
assert.equal((dock[1].match(/<svg\b/g) || []).length, 5, 'every dock button needs an icon');
assert(dock[1].includes('<span>Đặt xe</span>'), 'book button text missing');

// Mã số HKD được làm nổi bật, căn giữa trong footer.
assert(html.includes('<span class="license-badge-title">DỊCH VỤ UY TÍN – ĐƯỢC CẤP PHÉP</span>'), 'license title missing');
assert(html.includes('<span class="license-badge-id">Mã số HKD: 038085026047</span>'), 'license id missing');
const badgeCss = html.match(/<style id="license-badge">([\s\S]*?)<\/style>/);
assert(badgeCss && badgeCss[1].includes('margin:14px auto 4px') && badgeCss[1].includes('text-align:center'), 'license badge is not centred');
assert(html.indexOf('class="license-badge') > html.indexOf('<footer id="lienhe">'), 'license badge must be inside footer');

console.log('PASS: ghi chú gọn, nút icon + chữ đều, mã số HKD nổi bật');
