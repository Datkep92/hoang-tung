const assert = require('node:assert/strict');
const fs = require('node:fs');
const html = fs.readFileSync('index.html', 'utf8');

assert(/<section[^>]*id="dichvu"[^>]*hidden[^>]*>/.test(html), 'service section is not hidden');
assert(!html.includes('href="#dichvu"'), 'menu still links to the hidden section');
assert(html.includes('Dịch vụ taxi'), 'attached content was removed instead of hidden');
console.log('PASS: service section and its menu link are hidden');
