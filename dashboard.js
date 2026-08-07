// dashboard.js

import { auth, db } from "./firebase.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Wait until dashboard-app.js finishes loading properties
document.addEventListener("propertiesLoaded", () => {

    renderProperties();

    loadUser();

});

// ----------------------------
// Load User
// ----------------------------

async function loadUser() {

    const user = auth.currentUser;

    if (!user) return;

    try {

        const userRef = doc(db, "users", user.uid);

        const snap = await getDoc(userRef);

        if (snap.exists()) {

            const data = snap.data();

            document.getElementById("welcomeUser").textContent =
                "Welcome back, " +
                (data.fullName || "User") +
                " 👋";

        }

    } catch (e) {

        console.error(e);

    }

}

// ----------------------------
// Create Card
// ----------------------------

function createCard(property) {

    return `

<div class="card" data-id="${property.id}">

<div class="card-top">

<img src="${property.images[0]}">

<div class="pill">${property.type}</div>

<div class="actions">

<button class="act">⋯</button>

<button class="act heart">♡</button>

</div>

${property.badge ?
`<div class="badge-just">🔥 ${property.badge}</div>` : ""}

<div class="count">

${property.images.length}

</div>

</div>

<div class="card-body">

<div class="rent">

${property.saleType}

${property.rent}

</div>

<div class="deposit">

${property.deposit || ""}

</div>

<div class="title">

${property.title}

</div>

<div class="meta">

${property.beds ?
`<div>🛏 ${property.beds}</div>` : ""}

${property.baths ?
`<div>🛁 ${property.baths}</div>` : ""}

${property.floor ?
`<div>🏢 ${property.floor}</div>` : ""}

</div>

<div class="realtor">

<div class="realtor-left">

<div class="avatar">

<img src="https://i.pravatar.cc/100?u=${property.realtor}">

</div>

<div>

<div class="realtor-name">

${property.realtor}

</div>

<div class="realtor-sub">

Verified Realtor

</div>

</div>

</div>

</div>

</div>

</div>

`;

}

// ----------------------------
// Render
// ----------------------------

function renderProperties() {

    document.getElementById("feed").innerHTML =
        residentialProperties
        .map(createCard)
        .join("");

    document.getElementById("feed2").innerHTML =
        commercialProperties
        .map(createCard)
        .join("");

    document.getElementById("totalCount").textContent =
        properties.length;

}

// ----------------------------
// Search
// ----------------------------

document
.getElementById("searchInput")
.addEventListener("input", function () {

    const q = this.value.toLowerCase();

    document.querySelectorAll(".card")
    .forEach(card => {

        const title =
            card.querySelector(".title")
            .textContent
            .toLowerCase();

        card.style.display =
            title.includes(q)
            ? "block"
            : "none";

    });

});

// ----------------------------
// Open Property
// ----------------------------

document.addEventListener("click", (e) => {

    const card = e.target.closest(".card");

    if (!card) return;

    sessionStorage.setItem(
        "selectedProperty",
        card.dataset.id
    );

    location.href = "agent.html";

});

// ----------------------------
// Drawer
// ----------------------------

const drawer = document.getElementById("drawer");

document.getElementById("menuBtn").onclick = () => {

    drawer.classList.add("open");

};

document.getElementById("closeDrawer").onclick = () => {

    drawer.classList.remove("open");

};

drawer.onclick = (e) => {

    if (e.target === drawer)

        drawer.classList.remove("open");

};

// ----------------------------
// Logout
// ----------------------------

async function logout() {

    await signOut(auth);

    sessionStorage.clear();

    location.href = "login.html";

}

document.getElementById("logoutBtn").onclick = logout;

document.getElementById("logoutBtn2").onclick = logout;
