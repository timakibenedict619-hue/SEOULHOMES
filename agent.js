// agent.js - Part 1

import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// -----------------------
// Loader
// -----------------------

const loader = document.getElementById("loader");

// -----------------------
// Selected Property ID
// -----------------------

const propertyId = sessionStorage.getItem("selectedProperty");

if (!propertyId) {
    window.location.href = "dashboard.html";
}

// -----------------------
// Variables
// -----------------------

let property = null;
let imageIndex = 0;

// -----------------------
// DOM
// -----------------------

const mainImage = document.getElementById("mainImage");
const totalImages = document.getElementById("totalImages");
const currentImage = document.getElementById("currentImage");

// -----------------------
// Load Property
// -----------------------

async function loadProperty() {

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

        if (loader) {

            loader.style.display = "none";

        }

    } catch (error) {

        console.error(error);

        alert("Unable to load property.");

    }

}

loadProperty();

// -----------------------
// Display Property
// -----------------------

function displayProperty() {

    // Images

    imageIndex = 0;

    mainImage.src = property.images[0];

    totalImages.textContent =
        property.images.length;

    currentImage.textContent = 1;

    // Property

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
        "This beautiful property is located in one of Seoul's most desirable neighborhoods. It offers modern interiors, nearby transport, shopping, restaurants and excellent facilities.";

    // Realtor

    document.getElementById("agentName").textContent =
        property.realtor || "SeoulHomes Realtor";

    document.getElementById("agentAgency").textContent =
        "SeoulHomes Certified Realtor";

    // Google Map

    document.getElementById("mapFrame").src =
        property.map ||
        "https://maps.google.com/maps?q=Seoul&t=&z=13&ie=UTF8&iwloc=&output=embed";

}

// -----------------------
// Image Slider
// -----------------------

function updateImage() {

    mainImage.src =
        property.images[imageIndex];

    currentImage.textContent =
        imageIndex + 1;

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

        imageIndex =
            property.images.length - 1;

    }

    updateImage();

};
// =======================
// PART 2
// Save Property
// Favourite
// Share
// Contact
// Book Viewing
// Back Button
// =======================

import {
    doc,
    setDoc,
    deleteDoc,
    getDoc,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// -----------------------
// Current User
// -----------------------

const user = auth.currentUser;

if (!user) {
    location.href = "login.html";
}

// -----------------------
// Save Property
// -----------------------

const saveBtn =
    document.getElementById("saveProperty");

const favouriteBtn =
    document.getElementById("favoriteBtn");

async function checkSavedProperty() {

    const savedRef = doc(
        db,
        "users",
        user.uid,
        "savedProperties",
        property.id
    );

    const savedSnap = await getDoc(savedRef);

    if (savedSnap.exists()) {

        saveBtn.innerHTML =
            '<i class="fa-solid fa-heart"></i> Saved';

        favouriteBtn.innerHTML =
            '<i class="fa-solid fa-heart" style="color:red"></i>';

    }

}

async function saveProperty() {

    const savedRef = doc(
        db,
        "users",
        user.uid,
        "savedProperties",
        property.id
    );

    const savedSnap = await getDoc(savedRef);

    if (savedSnap.exists()) {

        await deleteDoc(savedRef);

        saveBtn.innerHTML =
            '<i class="fa-regular fa-heart"></i> Save';

        favouriteBtn.innerHTML =
            '<i class="fa-regular fa-heart"></i>';

        return;

    }

    await setDoc(savedRef, {

        propertyId: property.id,

        title: property.title,

        realtor: property.realtor,

        rent: property.rent,

        deposit: property.deposit,

        type: property.type,

        beds: property.beds,

        baths: property.baths,

        floor: property.floor,

        saleType: property.saleType,

        images: property.images,

        savedAt: serverTimestamp()

    });

    saveBtn.innerHTML =
        '<i class="fa-solid fa-heart"></i> Saved';

    favouriteBtn.innerHTML =
        '<i class="fa-solid fa-heart" style="color:red"></i>';

}

saveBtn.onclick = saveProperty;

favouriteBtn.onclick = saveProperty;

// Check when page loads

setTimeout(() => {

    if (property) {

        checkSavedProperty();

    }

}, 800);

// -----------------------
// Share
// -----------------------

document.getElementById("shareBtn").onclick =
async () => {

    if (navigator.share) {

        await navigator.share({

            title: property.title,

            text: property.title,

            url: location.href

        });

    } else {

        navigator.clipboard.writeText(
            location.href
        );

        alert("Property link copied.");

    }

};

// -----------------------
// Back
// -----------------------

document.getElementById("backBtn").onclick =
() => {

    history.back();

};

// -----------------------
// Contact Buttons
// -----------------------

document.getElementById("telegramBtn").onclick =
() => {

    window.open(
        "https://t.me/seoulhomes",
        "_blank"
    );

};

document.getElementById("whatsappBtn").onclick =
() => {

    window.open(
        "https://wa.me/821023456789",
        "_blank"
    );

};

document.getElementById("emailBtn").onclick =
() => {

    window.location.href =
        "mailto:agent@seoulhomes.com";

};

// -----------------------
// Book Viewing
// -----------------------

document.getElementById("bookViewing").onclick =
async () => {

    const date = prompt(
        "Enter your preferred viewing date (Example: Aug 12, 2026 - 2:00 PM)"
    );

    if (!date) return;

    try {

        await addDoc(

            collection(
                db,
                "users",
                user.uid,
                "viewings"
            ),

            {

                propertyId: property.id,

                title: property.title,

                realtor: property.realtor,

                viewingDate: date,

                rent: property.rent,

                deposit: property.deposit,

                image: property.images[0],

                createdAt: serverTimestamp()

            }

        );

        alert(
            "Viewing booked successfully!"
        );

    } catch (error) {

        console.error(error);

        alert(
            "Unable to book viewing."
        );

    }

};
// =======================
// PART 3
// Similar Properties
// =======================

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const similarContainer =
    document.getElementById("similarProperties");

// -----------------------
// Load Similar Properties
// -----------------------

async function loadSimilarProperties() {

    if (!property) return;

    try {

        const snapshot = await getDocs(
            collection(db, "properties")
        );

        similarContainer.innerHTML = "";

        let count = 0;

        snapshot.forEach((docSnap) => {

            if (count >= 4) return;

            const item = {
                id: docSnap.id,
                ...docSnap.data()
            };

            // Don't show the current property
            if (item.id === property.id) return;

            const card =
                document.createElement("div");

            card.className =
                "similar-card";

            card.innerHTML = `

                <img src="${item.images?.[0] || ""}" alt="">

                <div class="similar-info">

                    <h4>${item.title}</h4>

                    <p>${item.saleType} • ${item.rent}</p>

                </div>

            `;

            card.onclick = () => {

                sessionStorage.setItem(
                    "selectedProperty",
                    item.id
                );

                location.reload();

            };

            similarContainer.appendChild(card);

            count++;

        });

    } catch (error) {

        console.error(
            "Error loading similar properties:",
            error
        );

    }

}

// -----------------------
// Load Similar After Property Loads
// -----------------------

const waitForProperty = setInterval(() => {

    if (property) {

        clearInterval(waitForProperty);

        loadSimilarProperties();

    }

}, 200);
