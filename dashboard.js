import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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
function attachHearts() {
    document.querySelectorAll(".heart").forEach((heart, index) => {

        const key = "favorite_" + index;

        if (localStorage.getItem(key)) {
            heart.classList.add("active");
            heart.textContent = "♥";
        }

        heart.addEventListener("click", (e) => {
            e.stopPropagation();

            heart.classList.toggle("active");

            if (heart.classList.contains("active")) {
                heart.textContent = "♥";
                localStorage.setItem(key, true);
            } else {
                heart.textContent = "♡";
                localStorage.removeItem(key);
            }
        });

    });
}

// Drawer
const drawer = document.getElementById('drawer');
document.getElementById('menuBtn').addEventListener('click',()=>drawer.classList.add('open'));
document.getElementById('closeDrawer').addEventListener('click',()=>drawer.classList.remove('open'));
drawer.addEventListener('click',(e)=>{ if(e.target===drawer) drawer.classList.remove('open') });

// Image carousel on click
// Property click
document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    const title = card.dataset.title;
    const property = properties.find(
        p => p.title.toLowerCase() === title
    );

    if (!property) return;

    // Save recently viewed property
    localStorage.setItem("selectedProperty", JSON.stringify(property));

    // Open agent page
    window.location.href = "agent.html";
});
const username = localStorage.getItem("userName");

if (username) {
    document.getElementById("welcomeUser").textContent =
        "Welcome back, " + username + " 👋";
}
// Firebase Logout
const logoutBtn = document.getElementById("logoutBtn");
const logoutBtn2 = document.getElementById("logoutBtn2");

function logoutUser() {
    signOut(auth)
        .then(() => {
            localStorage.clear();
            sessionStorage.clear();

            alert("You have been logged out.");

            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Logout Error:", error);
            alert(error.message);
        });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
}

if (logoutBtn2) {
    logoutBtn2.addEventListener("click", logoutUser);
                        }
