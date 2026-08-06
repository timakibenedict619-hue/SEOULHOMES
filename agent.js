// agent.js

const loader = document.getElementById("loader");

const property = JSON.parse(localStorage.getItem("selectedProperty"));

if (!property) {
    window.location.href = "dashboard.html";
}

// -----------------------
// Hide Loader
// -----------------------
window.addEventListener("load", () => {
    if (loader) {
        loader.style.display = "none";
    }
});

// -----------------------
// Images
// -----------------------
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

// -----------------------
// Property Details
// -----------------------
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
    "This beautiful property is located in one of Seoul's most desirable neighborhoods. It offers modern interiors, excellent transportation links, nearby restaurants, shopping malls, schools and a peaceful environment. Contact the realtor today to arrange a viewing.";

// -----------------------
// Realtor
// -----------------------
document.getElementById("agentName").textContent =
    property.realtor;

document.getElementById("agentAgency").textContent =
    "SeoulHomes Certified Realtor";

// -----------------------
// Google Map
// -----------------------
const mapFrame = document.getElementById("mapFrame");

mapFrame.src =
    "https://maps.google.com/maps?q=Seoul&t=&z=13&ie=UTF8&iwloc=&output=embed";

// -----------------------
// Save Property
// -----------------------
const saveBtn = document.getElementById("saveProperty");

const saveKey = "saved_" + property.title;

if (localStorage.getItem(saveKey)) {
    saveBtn.innerHTML =
        '<i class="fa-solid fa-heart"></i> Saved';
}

saveBtn.onclick = () => {

    if (localStorage.getItem(saveKey)) {

        localStorage.removeItem(saveKey);

        saveBtn.innerHTML =
            '<i class="fa-regular fa-heart"></i> Save';

    } else {

        localStorage.setItem(saveKey, JSON.stringify(property));

        saveBtn.innerHTML =
            '<i class="fa-solid fa-heart"></i> Saved';

    }

};

// -----------------------
// Favourite Button
// -----------------------
const favouriteBtn = document.getElementById("favoriteBtn");

favouriteBtn.onclick = () => {

    favouriteBtn.innerHTML =
        '<i class="fa-solid fa-heart" style="color:red;"></i>';

};

// -----------------------
// Share
// -----------------------
document.getElementById("shareBtn").onclick = async () => {

    if (navigator.share) {

        await navigator.share({
            title: property.title,
            text: property.title,
            url: location.href
        });

    } else {

        navigator.clipboard.writeText(location.href);

        alert("Link copied.");

    }

};

// -----------------------
// Back
// -----------------------
document.getElementById("backBtn").onclick = () => {
    history.back();
};

// -----------------------
// Contact Buttons
// -----------------------
document.getElementById("telegramBtn").onclick = () => {
    window.open("https://t.me/seoulhomes", "_blank");
};
    


document.getElementById("whatsappBtn").onclick = () => {
    window.open(
        "https://wa.me/821023456789",
        "_blank"
    );
};

document.getElementById("emailBtn").onclick = () => {
    window.location.href =
        "mailto:agent@seoulhomes.com";
};

// -----------------------
// Book Viewing
// -----------------------
document.getElementById("bookViewing").onclick = () => {

    alert(
        "Your viewing request has been sent successfully. The realtor will contact you shortly."
    );

};

// -----------------------
// Similar Properties
// -----------------------
const similar = document.getElementById("similarProperties");

const similarList = properties
    .filter(p => p.title !== property.title)
    .slice(0, 4);

similar.innerHTML = "";

similarList.forEach(item => {

    const card = document.createElement("div");

    card.className = "similar-card";

    card.innerHTML = `
        <img src="${item.images[0]}">
        <h4>${item.title}</h4>
        <p>${item.rent}</p>
    `;

    card.onclick = () => {

        localStorage.setItem(
            "selectedProperty",
            JSON.stringify(item)
        );

        location.reload();

    };

    similar.appendChild(card);

});
