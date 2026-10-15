/* OUHSD Brand Center · shared behavior and global search */
(function(){
const ROOT=document.body.dataset.root||'';
const PAC='/Pacifica-Brand-Style-Guide/';
const D=ROOT+'assets/district/logos/';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- Theme ---------- */
const themeBtn=$('#themeBtn');
try{const t=localStorage.getItem('bc-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}
themeBtn&&themeBtn.addEventListener('click',()=>{
  const cur=document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  const nx=cur==='dark'?'light':'dark';document.documentElement.dataset.theme=nx;
  themeBtn.setAttribute('aria-label',nx==='dark'?'Switch to light mode':'Switch to dark mode');
  try{localStorage.setItem('bc-theme',nx)}catch(e){}
});

/* ---------- Toast + copy ---------- */
const toast=document.createElement('div');toast.className='toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.appendChild(toast);
let tt;function say(m){toast.textContent=m;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('on'),1800)}
async function copyText(t){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}say('Copied '+t)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-copy]');if(b){e.preventDefault();copyText(b.dataset.copy)}});
window.BC={copyText,say,esc,ROOT,PAC,D};

/* ---------- Menu drawer ---------- */
const drawer=$('#drawer'),menuBtn=$('#menuBtn');
function setMenu(o){if(!drawer)return;drawer.classList.toggle('open',o);menuBtn.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';(o?$('#drawerClose'):menuBtn).focus()}
menuBtn&&menuBtn.addEventListener('click',()=>setMenu(true));
$('#drawerClose')&&$('#drawerClose').addEventListener('click',()=>setMenu(false));
drawer&&drawer.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});

/* ---------- Tabs ---------- */
$$('[role=tablist]').forEach(list=>{
  const tabs=[...list.querySelectorAll('[role=tab]')];
  function sel(t,focus){tabs.forEach(x=>{const on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;const p=document.getElementById(x.getAttribute('aria-controls'));if(p)p.hidden=!on});if(focus)t.focus()}
  tabs.forEach((t,i)=>{t.addEventListener('click',()=>sel(t));t.addEventListener('keydown',e=>{let j=null;if(e.key==='ArrowRight')j=(i+1)%tabs.length;if(e.key==='ArrowLeft')j=(i-1+tabs.length)%tabs.length;if(e.key==='Home')j=0;if(e.key==='End')j=tabs.length-1;if(j!==null){e.preventDefault();sel(tabs[j],true)}})});
  const first=tabs.find(t=>t.getAttribute('aria-selected')==='true')||tabs[0];first&&sel(first);
});

/* ---------- Checklists (no storage needed) ---------- */

/* ---------- On-page TOC highlight ---------- */
const tocLinks=$$('.toc a[href^="#"]');
if(tocLinks.length&&'IntersectionObserver' in window){
  const map=new Map(tocLinks.map(a=>[a.getAttribute('href').slice(1),a]));
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){tocLinks.forEach(a=>a.classList.remove('on'));const a=map.get(en.target.id);if(a){a.classList.add('on');if(a.parentElement.scrollWidth>a.parentElement.clientWidth)a.scrollIntoView({block:'nearest',inline:'center'})}}}),{rootMargin:'-30% 0px -60% 0px'});
  map.forEach((a,id)=>{const s=document.getElementById(id);s&&io.observe(s)});
}

/* ---------- Search index ---------- */
const DL=(p,fmt)=>({href:p,fmt});
const IDX=[];
const add=(o)=>IDX.push(o);
// District logos
[['logo-stacked-color','District logo, stacked, full color','Default for print, letterhead, forms, and vertical layouts on white.',1],
 ['logo-horizontal-color','District logo, horizontal, full color','Website headers, email signatures, banners, slide headers.',0],
 ['logo-stacked-color-tagline','District logo, stacked + tagline','Dated, formal pieces: covers, programs, board materials.',0],
 ['logo-horizontal-color-tagline','District logo, horizontal + tagline','Wide formal layouts with the tagline.',0],
 ['logo-stacked-white','District logo, stacked, white','On Oxnard Blue, black, or dark photos.',0],
 ['logo-horizontal-white','District logo, horizontal, white','Dark headers, video lower thirds, dark slides.',0],
 ['logo-stacked-white-tagline','District logo, stacked white + tagline','Formal pieces on dark backgrounds.',0],
 ['logo-horizontal-white-tagline','District logo, horizontal white + tagline','Wide formal pieces on dark backgrounds.',0]
].forEach(([f,t,d,p])=>add({k:'Asset',t,d,href:'visual-identity.html#logos',img:D+'svg/'+f+'.svg',dark:/white/.test(f),dl:[DL(D+'svg/'+f+'.svg','SVG'),DL(D+'png/'+f+'.png','PNG'),DL(D+'jpg/'+f+'.jpg','JPG')],kw:'logo district ouhsd oxnard union download primary '+(p?'main default start ':'')+(/white/.test(f)?'reversed white dark knockout ':'')+(/tagline/.test(f)?'tagline formal ':'')+(/horizontal/.test(f)?'wide email signature website header presentation ':'stacked letterhead ')}));
add({k:'Asset',t:'All district logos (.zip)',d:'Every district logo in SVG and PNG, 1.2 MB.',href:'visual-identity.html#logos',ic:'zip',dl:[DL(ROOT+'assets/district/ouhsd-logos.zip','ZIP')],kw:'logo zip all download district package vendor'});
// Pacifica logos
[['primary-logo','Pacifica Primary Logo','The Triton over PACIFICA TRITONS. Start here.','primary main triton'],
 ['secondary-logo','Pacifica Triton (Secondary)','Triton figure alone. Athletics, spirit wear, dark backgrounds.','athletics mascot triton spirit'],
 ['alt-primary-trident','Pacifica Trident','Small spaces: left chest, caps, avatars.','icon small cap avatar favicon'],
 ['shield-logo','Pacifica Shield','Square spaces: avatars, stickers, patches.','avatar sticker patch social profile'],
 ['primary-wordmark','Pacifica Primary Word Mark','Trident over stacked PACIFICA TRITONS.','wordmark name letterhead'],
 ['secondary-wordmark-a','Pacifica Secondary Word Mark','Wide spaces: banners, web headers.','wordmark banner wide'],
 ['secondary-wordmark-b','Pacifica Block Word Mark','T-shirts, team bags, shirt backs.','wordmark shirt apparel'],
 ['numerals','Pacifica Numerals','Jersey and warm-up numbers 0 to 9.','numbers jersey uniform football basketball athletics'],
 ['football-helmet','Pacifica Football Helmet','Football only, full color.','football helmet athletics']
].forEach(([f,t,d,kw])=>add({k:'Asset',t,d,href:'schools/pacifica.html#logos',img:PAC+'logos/svg/pacifica-'+f+'-full-color.svg',dl:[DL(PAC+'logos/svg/pacifica-'+f+'-full-color.svg','SVG'),DL(PAC+'logos/png/pacifica-'+f+'-full-color.png','PNG')],kw:'pacifica tritons school logo '+kw}));
add({k:'Asset',t:'Triton Block font (.zip)',d:'Pacifica headline font: OTF for desktop, WOFF2 for web.',href:'schools/pacifica.html#type',ic:'font',dl:[DL(PAC+'triton-block-fonts.zip','ZIP')],kw:'font typeface pacifica triton block download typography'});
add({k:'Asset',t:'Montserrat (Google Fonts)',d:'District headline font. Free download.',href:'typography.html#primary',ic:'font',ext:'https://fonts.google.com/specimen/Montserrat',kw:'font typeface headline district montserrat typography download'});
add({k:'Asset',t:'Open Sans (Google Fonts)',d:'District body font. Free download.',href:'typography.html#secondary',ic:'font',ext:'https://fonts.google.com/specimen/Open+Sans',kw:'font typeface body district open sans typography download'});
// Colors as assets (copyable)
[['Oxnard Blue','#0033A1','District primary color.','colors.html#primary','blue navy district'],['Oxnard Red','#E20031','District primary color.','colors.html#primary','red district'],
 ['Pacifica Green','#006747','Pacifica lead color. PMS 342 C.','schools/pacifica.html#colors','green pacifica tritons school colors'],['Pacifica Gold','#CC8A00','Pacifica accent. PMS 131 C.','schools/pacifica.html#colors','gold pacifica tritons school colors']
].forEach(([t,h,d,href,kw])=>add({k:'Color',t:t+' '+h,d,href,sw:h,copy:h,kw:'color colour hex brand '+kw}));
// Templates (placeholders until Canva links are supplied)
const TPL=[['flyers','Flyer templates','Letter-size flyers for events and announcements.','flyer flier event announcement canva print'],
 ['social','Social media templates','Instagram and Facebook posts, stories, and covers.','social instagram facebook post story canva'],
 ['presentations','Presentation templates','Google Slides and PowerPoint, 16:9.','presentation slides powerpoint google slides keynote deck canva'],
 ['letterhead','Letterhead','District and school letterhead for letters and memos.','letterhead letter memo word google docs stationery'],
 ['reports','Report templates','Covers and inside pages for reports.','report annual document cover'],
 ['newsletters','Newsletter templates','Email and print newsletters.','newsletter email smore parentsquare'],
 ['posters','Poster templates','11 x 17 and 18 x 24 posters.','poster print large'],
 ['events','Event graphics','Graduation, open house, back to school, board events.','event graduation open house back to school ceremony program commencement'],
 ['athletics','Athletics graphics','Game day, schedules, rosters, signings.','athletics sports football game day schedule roster score'],
 ['web','Website graphics','Banners, buttons, and page headers.','website web banner header hero'],
 ['video','Video graphics','Intros, outros, lower thirds, thumbnails.','video intro outro lower third thumbnail youtube livestream'],
 ['email-signatures','Email signatures','Standard staff email signature.','email signature gmail outlook staff'],
 ['signage','Signage templates','Directional, room, and event signs.','signage sign banner directional room'],
 ['zoom','Virtual backgrounds','Zoom, Meet, and Teams backgrounds.','zoom meet teams virtual background meeting']];
TPL.forEach(([id,t,d,kw])=>add({k:'Template',t,d,href:id==='email-signatures'?'../email-signature-generator.html':'templates.html#'+id,ic:'tpl',kw:'template canva '+kw}));
// Guidelines
const G=[
 ['Brand overview','brand.html#overview','brand about who we are'],
 ['Mission and tagline','brand.html#mission','mission tagline positioning creating prosperity equity inquiry wellness'],
 ['Brand personality','brand.html#personality','personality traits'],
 ['Voice and tone','brand.html#voice','voice tone writing style'],
 ['Naming and terminology','brand.html#naming','naming name terminology'],
 ['District and school messaging','brand.html#messaging','messaging key messages talking points'],
 ['Logo library','visual-identity.html#logos','logo download svg png jpg'],
 ['Which file format? SVG, PNG, JPG','visual-identity.html#formats','svg png jpg eps pdf vendor format file'],
 ['District seal','visual-identity.html#seal','seal official'],
 ['Mascots and athletics marks','visual-identity.html#athletics','mascot athletics football sports team'],
 ['Clear space','visual-identity.html#clear-space','clear space spacing margin'],
 ['Minimum size','visual-identity.html#min-size','minimum size small'],
 ['Approved backgrounds','visual-identity.html#backgrounds','background dark photo contrast'],
 ['Incorrect logo usage','visual-identity.html#incorrect','incorrect misuse stretch recolor do dont'],
 ['Co-branding with partners','visual-identity.html#co-branding','co-branding partner sponsor lockup logo together'],
 ['Retired logos','visual-identity.html#retired','old retired outdated logo'],
 ['District color palette','colors.html#primary','colors palette hex rgb cmyk pantone blue red school colors'],
 ['Accessible color combinations','colors.html#accessible','contrast accessible wcag color combinations'],
 ['Tints and shades','colors.html#tints','tints shades lighter darker'],
 ['Typefaces','typography.html#primary','fonts typography typeface montserrat open sans'],
 ['Web-safe font alternatives','typography.html#web-safe','arial calibri fallback web safe fonts substitute'],
 ['Type hierarchy','typography.html#hierarchy','hierarchy sizes headings presentation slides print web'],
 ['Font licensing','typography.html#licensing','license licensing free'],
 ['Photography philosophy','photography.html#philosophy','photo photography style'],
 ['Photographing students','photography.html#students','students photo consent release'],
 ['Athletics photography','photography.html#athletics','sports athletics football photo'],
 ['Event photography','photography.html#events','events graduation photo ceremony'],
 ['Portraits and headshots','photography.html#portraits','portrait headshot staff photo'],
 ['Photo composition and cropping','photography.html#composition','composition cropping framing'],
 ['Photo permissions','photography.html#permissions','consent release opt out permission photo'],
 ['Video branding','video.html#branding','video branding youtube'],
 ['Video captions','video.html#captions','captions subtitles video accessibility spanish'],
 ['Lower thirds','video.html#lower-thirds','lower third name title video'],
 ['Livestream graphics','video.html#livestream','livestream stream graduation board meeting'],
 ['Video thumbnails','video.html#thumbnails','thumbnail youtube'],
 ['Interview framing','video.html#interviews','interview framing camera'],
 ['Website standards','digital-social.html#website','website web page wix'],
 ['Social media profiles','digital-social.html#profiles','social profile avatar instagram facebook cover'],
 ['Social post standards','digital-social.html#posts','social post instagram facebook'],
 ['Account naming and hashtags','digital-social.html#naming','account naming handle hashtag instagram'],
 ['Graphic dimensions','digital-social.html#dimensions','dimensions size pixels instagram facebook story youtube presentation slides banner email'],
 ['Writing alt text','accessibility.html#alt-text','alt text image description'],
 ['How to write the district name','writing.html#district-name','district name ouhsd oxnard union spelling'],
 ['School names','writing.html#school-names','school names spelling'],
 ['Abbreviations and acronyms','writing.html#abbreviations','abbreviations acronyms ouhsd'],
 ['Capitalization','writing.html#capitalization','capitalization capital letters'],
 ['Job titles','writing.html#titles','titles job principal superintendent'],
 ['English and Spanish communication','writing.html#bilingual','spanish bilingual translation english espanol'],
 ['Color contrast rules','accessibility.html#contrast','contrast wcag accessibility'],
 ['Accessible documents and PDFs','accessibility.html#documents','pdf document word accessible'],
 ['Accessible links','accessibility.html#links','links click here'],
 ['WCAG and ADA','accessibility.html#wcag','wcag ada section 508 accessibility law'],
 ['Request brand support','support.html#request','help support request contact design assistance'],
 ['Report an outdated asset','support.html#request','report outdated broken old'],
 ['Brand contact','support.html#contact','contact owner who teo'],
 ['Pacifica brand guidance','schools/pacifica.html#guidance','pacifica tritons rules approval principal'],
 ['Pacifica apparel and uniforms','schools/pacifica.html#guidance','pacifica apparel shirt uniform embroidery'],
 ['Full Pacifica style guide','/Pacifica-Brand-Style-Guide/','pacifica full style guide videos tester']
];
[['flyer','Create a flyer: step by step','flyer flier poster event print canva'],['social','Create a social post: step by step','social instagram facebook post story'],['presentation','Build a presentation: step by step','presentation slides powerpoint google slides deck'],['letter','Write a letter or document: step by step','letter document memo letterhead pdf'],['apparel','Order apparel: step by step','apparel shirt hoodie merchandise vendor embroidery uniform'],['signage','Make a sign or banner: step by step','sign signage banner vendor'],['video','Make a video: step by step','video youtube reel'],['web','Add website content: step by step','website web page'],['event','Plan graduation or an event: step by step','graduation event ceremony commencement program'],['athletics','Make an athletics graphic: step by step','athletics sports football game day']].forEach(([id,t,kw])=>G.push([t,'index.html?task='+id+'#create',kw]));
G.forEach(([t,href,kw])=>add({k:'Guide',t,href,ic:'doc',kw}));
// Schools
(window.BC_SCHOOLS||[]).forEach(s=>add({k:'School',t:s.name,d:s.live?'School brand center':'School brand center coming soon',href:'schools/'+(s.live?s.slug+'.html':'index.html#'+s.slug),ic:'school',kw:'school campus colors logos mascot '+s.name+' '+(s.mascot||'')+' '+(s.kw||'')}));

const PRI={Asset:40,Color:32,Template:30,School:42,Guide:10};
const SYN={flier:'flyer',ig:'instagram',insta:'instagram',fb:'facebook',ppt:'presentation',slides:'presentation',font:'typography',fonts:'typography',colours:'colors',colour:'color',espanol:'spanish',español:'spanish',grad:'graduation',commencement:'graduation',logos:'logo',tees:'shirt',tshirt:'shirt'};
function norm(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
function search(q){
  const terms=norm(q).split(/[^a-z0-9#]+/).filter(Boolean).map(t=>SYN[t]||t);
  if(!terms.length)return[];
  const res=IDX.map(o=>{const T=norm(o.t),K=norm(o.kw||''),Dd=norm(o.d||'');let s=0,hit=0;
    for(const w of terms){let m=0;const st=w.replace(/s$/,'');
      if(T.includes(w)||T.includes(st))m=6;else if(K.split(' ').some(k=>k.startsWith(st)))m=4;else if(Dd.includes(st))m=2;
      if(m)hit++;s+=m}
    if(!hit)return null;const full=hit===terms.length;if(!full)s*=.4;return {o,s:s+PRI[o.k]/10,full}}).filter(Boolean);
  const fulls=res.filter(x=>x.full);const use=fulls.length>=3?fulls:res;
  return use.sort((a,b)=>b.s-a.s).slice(0,24).map(x=>x.o);
}
window.BC.search=search;

/* ---------- Search palette UI ---------- */
const ICON={zip:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h10l6 6v10H4z"/><path d="M10 4v4m0 2v2m0 2v2"/></svg>',font:'<span style="font:800 18px var(--head)">Aa</span>',tpl:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></svg>',doc:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7M9 8h4"/></svg>',school:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10l9-6 9 6-9 6z"/><path d="M7 12v5c3 2 7 2 10 0v-5"/></svg>'};
const pal=document.createElement('div');pal.className='palette';pal.id='palette';
pal.innerHTML=`<div class="pal" role="dialog" aria-modal="true" aria-label="Search the Brand Center">
 <div class="pal-in"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
 <input id="palQ" type="search" role="combobox" aria-expanded="true" aria-controls="palRes" aria-autocomplete="list" placeholder="Search logos, templates, colors, schools..." autocomplete="off">
 <button class="iconbtn" type="button" id="palClose" aria-label="Close search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
 <div id="palRes" class="pal-res" role="listbox" aria-label="Results"></div>
 <div class="pal-foot"><span>Try:</span>${['logo','football','letterhead','Instagram','school colors','presentation','Canva','Spanish','video','graduation'].map(t=>`<button type="button" data-try="${t}">${t}</button>`).join('')}</div></div>`;
document.body.appendChild(pal);
const palQ=$('#palQ'),palRes=$('#palRes');let cur=-1,lastFocus=null;
const HREF=h=>/^(https?:|\/)/.test(h)?h:ROOT+h;
function thumb(o){if(o.img)return `<span class="th" ${o.dark?'style="background:var(--stage-dark)"':''}><img src="${o.img}" alt=""></span>`;if(o.sw)return `<span class="th" style="background:${o.sw}"></span>`;return `<span class="th ic">${ICON[o.ic]||ICON.doc}</span>`}
function render(){
  const q=palQ.value.trim();cur=-1;
  if(!q){palRes.innerHTML=`<div class="pal-grp">Popular</div>`+[IDX[0],IDX.find(o=>o.t.startsWith('Pacifica Primary')),IDX.find(o=>o.k==='Template'&&o.t.startsWith('Flyer')),IDX.find(o=>o.t==='District color palette'),IDX.find(o=>o.t==='Request brand support')].filter(Boolean).map(row).join('');bind();return}
  const r=search(q);
  if(!r.length){palRes.innerHTML=`<div class="pal-empty">No matches for "${esc(q)}". Try "logo", "flyer", or a school name, or <a href="${ROOT}support.html#request">ask for help</a>.</div>`;return}
  const groups={Asset:'Downloads',Color:'Colors',Template:'Templates',School:'Schools',Guide:'Guidelines'};let html='';
  for(const g of Object.keys(groups)){const rs=r.filter(o=>o.k===g);if(rs.length)html+=`<div class="pal-grp">${groups[g]}</div>`+rs.map(row).join('')}
  palRes.innerHTML=html;bind();
}
let rid=0;
function row(o){rid++;const dl=o.dl?o.dl.map(d=>d.fmt).join(' · '):o.copy?'Copy':o.k==='Template'?'Template':'';
  return `<a id="pr${rid}" role="option" aria-selected="false" href="${HREF(o.href)}" data-dl="${o.dl?esc(o.dl[0].href):''}" data-copyval="${o.copy||''}">${thumb(o)}<span><span class="tt">${esc(o.t)}</span>${o.d?`<span class="dd">${esc(o.d)}</span>`:''}</span><span class="kind">${dl||o.k}</span></a>`}
function opts(){return [...palRes.querySelectorAll('[role=option]')]}
function bind(){opts().forEach(a=>a.addEventListener('click',()=>closePal(false)))}
function move(d){const os=opts();if(!os.length)return;cur=(cur+d+os.length)%os.length;os.forEach((a,i)=>a.setAttribute('aria-selected',i===cur));os[cur].scrollIntoView({block:'nearest'});palQ.setAttribute('aria-activedescendant',os[cur].id)}
palQ.addEventListener('input',render);
palQ.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();move(1)}else if(e.key==='ArrowUp'){e.preventDefault();move(-1)}else if(e.key==='Enter'){const os=opts();const a=os[cur>=0?cur:0];if(a){e.preventDefault();a.click();location.href=a.href}}else if(e.key==='Escape'){closePal(true)}});
pal.addEventListener('click',e=>{if(e.target===pal)closePal(true);const t=e.target.closest('[data-try]');if(t){palQ.value=t.dataset.try;render();palQ.focus()}});
$('#palClose').addEventListener('click',()=>closePal(true));
function openPal(q){lastFocus=document.activeElement;pal.classList.add('open');document.body.style.overflow='hidden';palQ.value=q||'';render();setTimeout(()=>palQ.focus(),10)}
function closePal(ret){pal.classList.remove('open');document.body.style.overflow='';if(ret&&lastFocus)lastFocus.focus()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-search]');if(b){e.preventDefault();openPal(b.dataset.search||'')}});
document.addEventListener('keydown',e=>{if((e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName))||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k')){e.preventDefault();openPal()}if(e.key==='Escape'&&drawer&&drawer.classList.contains('open'))setMenu(false)});
pal.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const f=[...pal.querySelectorAll('input,button,a[href]')].filter(x=>x.offsetParent);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}});
const qs=new URLSearchParams(location.search).get('q');if(qs)openPal(qs);
})();
