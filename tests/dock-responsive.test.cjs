const fs = require('fs');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');

const style = html.match(/<style id="dock-responsive">([\s\S]*?)<\/style>/);
assert(style, 'dock-responsive style missing');
const css = style[1];
assert(css.includes('display:grid'), 'dock is not a grid');
assert(css.includes('grid-template-columns:repeat(5,minmax(0,1fr))'), 'dock columns are not equal and fluid');
assert(css.includes('gap:clamp(3px,1.4vw,8px)'), 'dock gap does not adapt');
assert(css.includes('.dock>a{display:flex;align-items:center;justify-content:center;width:100%;max-width:120px;margin-inline:auto;min-width:0;min-height:48px'), 'dock buttons are not centred and evenly sized');
assert(css.includes('.dock .app-icon svg{width:clamp(28px,8.5vw,42px);height:clamp(28px,8.5vw,42px)}'), 'dock icons do not scale with width');
assert(css.includes('@media(min-width:521px){.dock{grid-template-columns:repeat(5,minmax(0,112px));justify-content:center}}'), 'wide screens are not capped');

const dock = html.match(/<div class="dock">([\s\S]*?)<\/div>\s*<div aria-hidden="true" id="translation-engine">/);
assert(dock, 'dock markup missing');
assert.equal((dock[1].match(/<a\b/g) || []).length, 5, 'dock must have five buttons');
assert(html.indexOf('<style id="dock-responsive">') > html.lastIndexOf('<style', html.indexOf('<style id="dock-responsive">') - 1), 'dock style must come after other styles');
console.log('PASS: balanced fluid dock buttons');
