import { auth, db } from "./firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const savedList = document.getElementById("savedList");
const emptyState = document.getElementById("emptyState");
const savedCount = document.getElementById("savedCount");

let currentUser = null;

// ----------------------
// Load Saved Properties
// ----------------------

async function loadSavedProperties() {

    savedList.innerHTML = "";

    if (!currentUser) return;

    const snapshot = await getDocs(
        collection(
            db,
            "users",
            currentUser.uid,
            "savedProperties"
        )
    );

    savedCount.textContent = snapshot.size;

    if (snapshot.empty) {

        savedList.style.display = "none";
        emptyState.style.display = "block";

        return;

    }

    savedList.style.display = "grid";
    emptyState.style.display = "none";

    snapshot.forEach((docSnap) => {

        const property = docSnap.data();

        const card = document.createElement("div");

        card.className = "saved-card";

        card.innerHTML = `

        <div class="saved-image">

            <img src="${property.images[0]}" alt="">

            <button class="remove-btn">
                <i class="fa-solid fa-heart"></i>
            </button>

        </div>

        <div class="saved-content">

            <div class="saved-price">

                ${property.saleType} • ${property.rent}

            </div>

            <div class="saved-deposit">

                ${property.deposit || "No Deposit"}

            </div>

            <div class="saved-title">

                ${property.title}

            </div>

            <div class="saved-meta">

                <span>🛏 ${property.beds || "-"}</span>

                <span>🛁 ${property.baths || "-"}</span>

                <span>🏢 ${property.floor || "-"}</span>

            </div>

            <div class="saved-agent">

                <div class="agent-left">

                    <img src="https://i.pravatar.cc/100?u=${property.realtor}">

                    <div>

                        <div class="agent-name">

                            ${property.realtor}

                        </div>

                        <div class="agent-role">

                            Verified Realtor

                        </div>

                    </div>

                </div>

            </div>

            <button class="view-btn">

                View Property

            </button>

        </div>

        `;

        // View Property

        card.querySelector(".view-btn").onclick = () => {

            localStorage.setItem(
                "selectedProperty",
                JSON.stringify(property)
            );

            window.location.href = "agent.html";

        };

        // Remove Saved Property

        card.querySelector(".remove-btn").onclick = async (e) => {

            e.stopPropagation();

            await deleteDoc(
                doc(
                    db,
                    "users",
                    currentUser.uid,
                    "savedProperties",
                    docSnap.id
                )
            );

            loadSavedProperties();

        };

        savedList.appendChild(card);

    });

}

// ----------------------
// Wait for Login
// ----------------------

onAuthStateChanged(auth, (user) => {

    if (!user) {

        location.href = "login.html";

        return;

    }

    currentUser = user;

    loadSavedProperties();

});

// ----------------------
// Back Button
// ----------------------

document.getElementById("backBtn").onclick = () => {

    history.back();

};

// ----------------------
// Refresh
// ----------------------

document.getElementById("refreshBtn").onclick = () => {

    loadSavedProperties();

};
