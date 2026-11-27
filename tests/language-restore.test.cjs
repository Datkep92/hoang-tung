const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const home=fs.readFileSync('index.html','utf8').match(/<script id="language-script">([\s\S]*?)<\/script>/)[1];
const info=fs.readFileSync('assets/info-language.js','utf8');
function run(script,path,isHome){
 const writes=[],listeners={},opt=['vi','en','ko','zh-CN','ja','ru'].map(value=>({value,textContent:''}));let reloaded=false,saved='';
 const select={options:opt,value:'vi',addEventListener:(_,f)=>listeners.change=f};const status={textContent:''};
 const fields={};for(const id of ['fullname','phone','seat','pickup','drop','date','time','note','consent'])fields[id]={value:id,type:id==='consent'?'checkbox':'text',checked:true};
 const document={get cookie(){return 'other=1; googtrans=%2Fvi%2Fen'},set cookie(v){writes.push(v)},getElementById(id){return id==='site-language'?select:id==='language-status'?status:fields[id]},createElement(){return {remove(){}}},head:{appendChild(){},append(){}}};
 const location={hostname:'www.hatungxehopdong.com',pathname:path,reload(){reloaded=true}};
 const window={};const context={document,location,window,sessionStorage:{setItem:(k,v)=>{saved=v}},setTimeout:()=>1,clearTimeout:()=>{},setInterval:()=>1,clearInterval:()=>{},Set,decodeURIComponent};vm.runInNewContext(script,context);
 assert.equal(select.value,'en','translation cookie must be read after other cookies');if(isHome){assert.equal(opt.find(x=>x.value==='en').textContent,'🇬🇧 EN');assert.match(opt.find(x=>x.value==='vi').textContent,/🇻🇳/)}
 select.value='vi';listeners.change();assert(reloaded,'should reload in Vietnamese');for(const part of ['path=/','domain=www.hatungxehopdong.com','domain=.hatungxehopdong.com'])assert(writes.some(v=>v.includes(part)),part);if(isHome)assert(saved.includes('fullname'),'booking draft preserved');
}
run(home,'/',true);run(info,'/dich-vu/',false);console.log('PASS: cookie detection, domain and path cleanup, language flags, booking draft');
