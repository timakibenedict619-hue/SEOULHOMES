// ======================================================
// agent.js - Part 1
// Firebase Setup & Property Loading
// ======================================================

import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------------------
// Loader
// ---------------------

const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    if (loader) loader.style.display = "none";
});

// ---------------------
// Current User
// ---------------------

let currentUser = null;
let property = null;

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        location.href = "login.html";
        return;

    }

    currentUser = user;

    await loadProperty();

});

// ---------------------
// Load Selected Property
// ---------------------

async function loadProperty() {

    const propertyId = sessionStorage.getItem("selectedProperty");

    if (!propertyId) {

        location.href = "dashboard.html";
        return;

    }

    try {

        const ref = doc(db, "properties", propertyId);

        const snap = await getDoc(ref);

        if (!snap.exists()) {

            alert("Property not found.");

            location.href = "dashboard.html";

            return;

        }

        property = {

            id: snap.id,
            ...snap.data()

        };

        displayProperty();

    } catch (error) {

        console.error(error);

        alert("Unable to load property.");

    }

}

// ---------------------
// Display Property
// ---------------------

function displayProperty() {

    const mainImage = document.getElementById("mainImage");
    const totalImages = document.getElementById("totalImages");
    const currentImage = document.getElementById("currentImage");

    let imageIndex = 0;

    mainImage.src = property.images[0];

    totalImages.textContent = property.images.length;

    currentImage.textContent = 1;

    function updateImage() {

        mainImage.src = property.images[imageIndex];

        currentImage.textContent = imageIndex + 1;

    }

    document.getElementById("nextImage").onclick = () => {

        imageIndex++;

        if (imageIndex >= property.images.length) {

            imageIndex = 0;

        }

        updateImage();

    };

    document.getElementById("prevImage").onclick = () => {

        imageIndex--;

        if (imageIndex < 0) {

            imageIndex = property.images.length - 1;

        }

        updateImage();

    };

    document.getElementById("propertyType").textContent =
        property.type || "-";

    document.getElementById("propertyPrice").textContent =
        `${property.saleType} • ${property.rent}`;

    document.getElementById("propertyDeposit").textContent =
        property.deposit || "No Deposit";

    document.getElementById("propertyTitle").textContent =
        property.title;

    document.getElementById("beds").textContent =
        property.beds || "-";

    document.getElementById("baths").textContent =
        property.baths || "-";

    document.getElementById("floor").textContent =
        property.floor || "-";

    document.getElementById("propertyDescription").textContent =
        property.description ||
        "This beautiful property is located in one of Seoul's most desirable neighborhoods.";

    document.getElementById("agentName").textContent =
        property.realtor;

    document.getElementById("agentAgency").textContent =
        "SeoulHomes Certified Realtor";

    document.getElementById("mapFrame").src =
        `https://maps.google.com/maps?q=${encodeURIComponent(property.title)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

}
// ======================================================
// agent.js - Part 2
// Save Property, Book Viewing & Actions
// ======================================================

import {
    doc,
    setDoc,
    deleteDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------------------
// Save Property
// ---------------------

const saveBtn = document.getElementById("saveProperty");

async function checkSavedProperty() {

    const saveRef = doc(
        db,
        "users",
        currentUser.uid,
        "savedProperties",
        property.id
    );

    const saveSnap = await getDoc(saveRef);

    if (saveSnap.exists()) {

        saveBtn.innerHTML =
            '<i class="fa-solid fa-heart"></i> Saved';

    }

}

checkSavedProperty();

saveBtn.onclick = async () => {

    const saveRef = doc(
        db,
        "users",
        currentUser.uid,
        "savedProperties",
        property.id
    );

    const saveSnap = await getDoc(saveRef);

    if (saveSnap.exists()) {

        await deleteDoc(saveRef);

        saveBtn.innerHTML =
            '<i class="fa-regular fa-heart"></i> Save';

    } else {

        await setDoc(saveRef, property);

        saveBtn.innerHTML =
            '<i class="fa-solid fa-heart"></i> Saved';

    }

};

// ---------------------
// Book Viewing
// ---------------------

document.getElementById("bookViewing").onclick = async () => {

    const date = prompt(
        "Enter your preferred viewing date (Example: Aug 12, 2026 - 2:00 PM)"
    );

    if (!date) return;

    await setDoc(

        doc(
            db,
            "users",
            currentUser.uid,
            "viewings",
            property.id
        ),

        {
            ...property,
            viewingDate: date,
            bookedAt: new Date()
        }

    );

    alert("Viewing booked successfully!");

};

// ---------------------
// Favourite Icon
// ---------------------

document.getElementById("favoriteBtn").onclick = () => {

    document.getElementById("favoriteBtn").innerHTML =
        '<i class="fa-solid fa-heart" style="color:red;"></i>';

};

// ---------------------
// Share
// ---------------------

document.getElementById("shareBtn").onclick = async () => {

    if (navigator.share) {

        await navigator.share({

            title: property.title,

            text: property.title,

            url: location.href

        });

    } else {

        await navigator.clipboard.writeText(location.href);

        alert("Property link copied.");

    }

};

// ---------------------
// Back Button
// ---------------------

document.getElementById("backBtn").onclick = () => {

    history.back();

};

// ---------------------
// Contact Realtor
// ---------------------

document.getElementById("whatsappBtn").onclick = () => {

    window.open(
        "https://wa.me/821023456789",
        "_blank"
    );

};

document.getElementById("telegramBtn").onclick = () => {

    window.open(
        "https://t.me/seoulhomes",
        "_blank"
    );

};

document.getElementById("emailBtn").onclick = () => {

    window.location.href =
        "mailto:agent@seoulhomes.com";

};
// ======================================================
// agent.js - Part 3
// Similar Properties (Firebase)
// ======================================================

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------------------
// Similar Properties
// ---------------------

const similarContainer =
    document.getElementById("similarProperties");

async function loadSimilarProperties() {

    similarContainer.innerHTML = "";

    try {

        const snapshot = await getDocs(
            collection(db, "properties")
        );

        let count = 0;

        snapshot.forEach((docSnap) => {

            if (count >= 4) return;

            const item = {

                id: docSnap.id,

                ...docSnap.data()

            };

            // Don't show current property
            if (item.id === property.id) return;

            const card = document.createElement("div");

            card.className = "similar-card";

            card.innerHTML = `

                <img src="${item.images[0]}" alt="">

                <h4>${item.title}</h4>

                <p>${item.saleType} • ${item.rent}</p>

            `;

            card.onclick = () => {

                // Store selected property ID
                sessionStorage.setItem(
                    "selectedProperty",
                    item.id
                );

                // Reload details page
                location.reload();

            };

            similarContainer.appendChild(card);

            count++;

        });

    } catch (error) {

        console.error("Error loading similar properties:", error);

    }

}

loadSimilarProperties();
