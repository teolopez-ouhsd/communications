/* Renders a standardized school mini Brand Center from window.SCHOOL.
   Every school page uses the same sections; only the data changes. */
document.addEventListener('DOMContentLoaded',()=>{
const S=window.SCHOOL;if(!S)return;
const B=S.base, $=id=>document.getElementById(id), esc=BC.esc;
const VER={'full-color':'Full color','one-color':'One color','black-white':'Black and white','grayscale':'Grayscale'};
const file=(id,v,ext)=>`${B}logos/${ext}/${S.prefix}${id}-${v}.${ext}`;
const byId=id=>S.logos.find(l=>l.id===id);

/* Asset card */
function card(l,opts={}){const v=opts.v&&(!l.only||l.only===opts.v)?opts.v:(l.only||'full-color');const bg=opts.bg||'white';
 const blocked=bg!=='white'&&l.dark===false;const warn=bg!=='white'&&l.dark===null;
 const bgc={white:'#fff',color:S.colors[0].hex,black:'#000'}[bg];
 return `<article class="asset"><div class="pv" style="background:${bgc}">${l.primary?'<span class="tag req" style="background:var(--s1);color:var(--s1fg)">Start here</span>':''}
 <img src="${file(l.id,v,'svg')}" alt="${esc(l.name)}, ${VER[v].toLowerCase()}" loading="lazy" style="${blocked?'opacity:.25':''}">
 ${blocked?'<span class="tag req" style="position:absolute;bottom:10px;left:10px">Not for this background</span>':warn?'<span class="tag draft" style="position:absolute;bottom:10px;left:10px">Check contrast</span>':''}</div>
 <div class="bd"><h3>${esc(l.name)}</h3><p>${esc(l.desc)}</p><span class="ver">${VER[v]} · ${l.dark===true?'Light or dark backgrounds':l.dark===false?'Light backgrounds only':'Check contrast on dark'}</span>
 <div class="dl"><a class="btn sm" href="${file(l.id,v,'svg')}" download aria-label="Download ${esc(l.name)} ${VER[v]} SVG">SVG</a><a class="btn ghost sm" href="${file(l.id,v,'png')}" download aria-label="Download ${esc(l.name)} ${VER[v]} PNG">PNG</a></div></div></article>`}

/* Primary logo */
const P=S.logos.find(l=>l.primary);
$('primaryLogo').innerHTML=`<div class="grid g2" style="align-items:center"><div class="card flat" style="background:#fff;display:grid;place-items:center;padding:28px"><img src="${file(P.id,'full-color','svg')}" alt="${esc(S.name)} ${esc(P.name)}" style="max-height:240px;width:auto"></div>
 <div><h3>${esc(P.name)}</h3><p class="muted">${esc(P.desc)}</p><div class="actions"><a class="btn" href="${file(P.id,'full-color','svg')}" download>Download SVG</a><a class="btn ghost" href="${file(P.id,'full-color','png')}" download>Download PNG</a></div>
 <p class="small muted" style="margin-top:12px"><b>SVG</b> for vendors and print. <b>PNG</b> for slides, Canva, documents, and social.</p></div></div>`;

/* Mascot and athletics */
$('mascotCards').innerHTML=S.mascot.ids.map(id=>card(byId(id))).join('');
$('athleticsCards').innerHTML=S.athletics.map(id=>card(byId(id))).join('');

/* Colors */
const cp=t=>`<button class="copy" data-copy="${t}" aria-label="Copy ${t}">${t}</button>`;
$('schoolColors').innerHTML=S.colors.map(c=>`<div class="sw"><div class="chipc" style="background:#${c.hex};color:${c.fg};${c.hex==='000000'?'box-shadow:inset 0 0 0 1px #333':''}"><span>${c.role}</span><h3>${c.n}</h3></div><dl><dt>HEX</dt><dd>${cp('#'+c.hex)}</dd><dt>RGB</dt><dd>${cp(c.rgb)}</dd><dt>CMYK</dt><dd>${cp(c.cmyk)}</dd><dt>PMS</dt><dd>${cp(c.pms)}</dd></dl><div class="use">${c.use}</div></div>`).join('');

/* Variations library */
const st={v:'full-color',bg:'white',type:'all'};
function lib(){const ls=S.logos.filter(l=>st.type==='all'||l.type===st.type);
 $('libCount').textContent=`Showing ${ls.length} of ${S.logos.length} marks`;
 $('libGrid').innerHTML=ls.map(l=>card(l,st)).join('')}
document.querySelectorAll('[data-lv],[data-lb],[data-lt]').forEach(b=>b.addEventListener('click',()=>{
 const k=b.dataset.lv?'v':b.dataset.lb?'bg':'type',val=b.dataset.lv||b.dataset.lb||b.dataset.lt,attr=b.dataset.lv?'lv':b.dataset.lb?'lb':'lt';
 st[k]=val;document.querySelectorAll(`[data-${attr}]`).forEach(x=>x.setAttribute('aria-pressed',x===b));lib()}));
lib();
});
