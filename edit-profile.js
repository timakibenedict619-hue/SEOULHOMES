// edit-profile.js

// -----------------------------
// Load Saved User Information
// -----------------------------

const profileImage = document.getElementById("profileImage");
const photoInput = document.getElementById("photoInput");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const locationInput = document.getElementById("location");
const bio = document.getElementById("bio");

const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");
const backBtn = document.getElementById("backBtn");

const toast = document.getElementById("toast");

// -----------------------------
// Load Data
// -----------------------------

fullName.value = localStorage.getItem("userName") || "";

email.value = localStorage.getItem("userEmail") || "";

phone.value = localStorage.getItem("userPhone") || "";

locationInput.value = localStorage.getItem("userLocation") || "";

bio.value = localStorage.getItem("userBio") || "";

const savedPhoto = localStorage.getItem("userPhoto");

if (savedPhoto) {
    profileImage.src = savedPhoto;
}

// -----------------------------
// Change Profile Picture
// -----------------------------

photoInput.onchange = function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        profileImage.src = e.target.result;

        localStorage.setItem(
            "userPhoto",
            e.target.result
        );

    };

    reader.readAsDataURL(file);

};

// -----------------------------
// Save Profile
// -----------------------------

saveBtn.onclick = () => {

    if (
        fullName.value.trim() === "" ||
        email.value.trim() === ""
    ) {

        showToast(
            "Please complete the required fields."
        );

        return;

    }

    localStorage.setItem(
        "userName",
        fullName.value
    );

    localStorage.setItem(
        "userEmail",
        email.value
    );

    localStorage.setItem(
        "userPhone",
        phone.value
    );

    localStorage.setItem(
        "userLocation",
        locationInput.value
    );

    localStorage.setItem(
        "userBio",
        bio.value
    );

    showToast(
        "Profile updated successfully."
    );

};

// -----------------------------
// Logout
// -----------------------------

logoutBtn.onclick = () => {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.clear();

        sessionStorage.clear();

        location.href = "login.html";

    }

};

// -----------------------------
// Back Button
// -----------------------------

backBtn.onclick = () => {

    history.back();

};

// -----------------------------
// Toast Message
// -----------------------------

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}
