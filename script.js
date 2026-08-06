// script.js - UI Logic for Seoul Homes Replica

const feed = document.getElementById('feed');
const feed2 = document.getElementById('feed2');

function createCard(p){
  const img = p.images[0];
  return `
  <div class="card" data-title="${p.title.toLowerCase()}">
    <div class="card-top">
      <img src="${img}" loading="lazy">
      <div class="pill">${p.type}</div>
      <div class="actions"><button class="act">⋯</button><button class="act heart">♡</button></div>
      ${p.badge ? `<div class="badge-just">🔥 ${p.badge}</div>` : ''}
      ${p.extra ? `<div style="position:absolute;left:12px;top:56px;background:rgba(255,255,255,.9);font-size:10px;padding:4px 8px;border-radius:12px">☀️ ${p.extra}</div>` : ''}
      <div class="count">${p.count || '1/'+p.images.length}</div>
    </div>
    <div class="card-body">
      <div class="rent">${p.saleType==='Sale'?'Sale':''} ${p.saleType==='Sale'?'':''} ${p.saleType==='Rent'?'Rent':''} ${p.rent} <span>KRW</span></div>
      ${p.deposit?`<div class="deposit">Deposit ${p.deposit} won ${p.pricePer?`· ${p.pricePer}`:''}</div>`:p.pricePer?`<div class="deposit">${p.pricePer}</div>`:''}
      <div class="title">${p.title}</div>
      <div class="meta">
        ${p.beds?`<div>🛏 ${p.beds}</div>`:''}
        ${p.baths?`<div>🛁 ${p.baths}</div>`:''}
        ${p.floor?`<div>🏢 ${p.floor}</div>`:''}
        ${p.dir?`<div>📍 ${p.dir}</div>`:''}
        <div>🕒 ${p.date}</div>
      </div>
      <div class="realtor">
        <div class="realtor-left">
          <div class="avatar"><img src="https://i.pravatar.cc/100?img=${Math.floor(Math.random()*20)+1}"></div>
          <div><div class="realtor-name">${p.realtor} ${p.verified?'✓':''}</div><div class="realtor-sub">Realtor ${p.lang?`· ${p.lang}`:''}</div></div>
        </div>
        <div>›</div>
      </div>
    </div>
  </div>`;
}

function render(){
  feed.innerHTML = residentialProperties.map(createCard).join('');
  feed2.innerHTML = commercialProperties.map(createCard).join('');
  attachHearts();
}
render();

// Search filter
document.getElementById('searchBtn').addEventListener('click', doSearch);
document.getElementById('searchInput').addEventListener('input', doSearch);
function doSearch(){
  const q = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.card').forEach(card=>{
    const t = card.dataset.title;
    card.style.display = t.includes(q) ? 'block' : 'none';
  });
}

// Heart toggle
function attachHearts(){
  document.querySelectorAll('.heart').forEach(h=>{
    h.addEventListener('click',()=>{
      h.classList.toggle('active');
      h.textContent = h.classList.contains('active')?'♥':'♡';
    });
  });
}

// Drawer
const drawer = document.getElementById('drawer');
document.getElementById('menuBtn').addEventListener('click',()=>drawer.classList.add('open'));
document.getElementById('closeDrawer').addEventListener('click',()=>drawer.classList.remove('open'));
drawer.addEventListener('click',(e)=>{ if(e.target===drawer) drawer.classList.remove('open') });

// Image carousel on click
document.addEventListener('click',(e)=>{
  const top = e.target.closest('.card-top');
  if(!top) return;
  const card = top.closest('.card');
  const title = card.dataset.title;
  const prop = properties.find(p=>p.title.toLowerCase()===title);
  if(!prop || prop.images.length<2) return;
  let idx = parseInt(top.dataset.idx||0);
  idx = (idx+1)%prop.images.length;
  top.dataset.idx = idx;
  top.querySelector('img').src = prop.images[idx];
  const cnt = top.querySelector('.count');
  if(cnt) cnt.textContent = (idx+1)+'/'+prop.images.length;
});
