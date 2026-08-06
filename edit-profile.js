// edit-profile.js

// =============================
// Elements
// =============================

const profileImage = document.getElementById("profileImage");
const profileUpload = document.getElementById("profileUpload");

const profileName = document.getElementById("profileName");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const country = document.getElementById("country");
const language = document.getElementById("language");

const propertyType = document.getElementById("propertyType");
const budget = document.getElementById("budget");

const notifications = document.getElementById("notifications");
const darkMode = document.getElementById("darkMode");

const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");
const backBtn = document.getElementById("backBtn");

const changePassword = document.getElementById("changePassword");
const deleteAccount = document.getElementById("deleteAccount");

// =============================
// Load User Data
// =============================

function loadProfile() {

    fullName.value = localStorage.getItem("userName") || "";

    email.value = localStorage.getItem("userEmail") || "";

    phone.value = localStorage.getItem("userPhone") || "";

    country.value = localStorage.getItem("userCountry") || "South Korea";

    language.value = localStorage.getItem("userLanguage") || "English";

    propertyType.value =
        localStorage.getItem("propertyType") || "Apartment";

    budget.value =
        localStorage.getItem("propertyBudget") || "₩100M - ₩300M";

    notifications.checked =
        localStorage.getItem("notifications") !== "false";

    darkMode.checked =
        localStorage.getItem("darkMode") === "true";

    profileName.textContent =
        fullName.value || "Guest User";

    const photo = localStorage.getItem("userPhoto");

    if (photo) {

        profileImage.src = photo;

    }

}

loadProfile();

// =============================
// Change Profile Photo
// =============================

profileUpload.addEventListener("change", function () {

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

});

// =============================
// Save Profile
// =============================

saveBtn.addEventListener("click", () => {

    if (
        fullName.value.trim() === "" ||
        email.value.trim() === ""
    ) {

        showToast(
            "Please fill in your name and email."
        );

        return;

    }

    localStorage.setItem("userName", fullName.value);

    localStorage.setItem("userEmail", email.value);

    localStorage.setItem("userPhone", phone.value);

    localStorage.setItem("userCountry", country.value);

    localStorage.setItem("userLanguage", language.value);

    localStorage.setItem("propertyType", propertyType.value);

    localStorage.setItem("propertyBudget", budget.value);

    localStorage.setItem(
        "notifications",
        notifications.checked
    );

    localStorage.setItem(
        "darkMode",
        darkMode.checked
    );

    profileName.textContent = fullName.value;

    showToast("Profile updated successfully.");

});

// =============================
// Logout
// =============================

logoutBtn.addEventListener("click", () => {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    localStorage.clear();

    sessionStorage.clear();

    window.location.href = "login.html";

});

// =============================
// Back Button
// =============================

backBtn.addEventListener("click", () => {

    history.back();

});

// =============================
// Change Password
// =============================

changePassword.addEventListener("click", () => {

    showToast(
        "Password change feature coming soon."
    );

});

// =============================
// Delete Account
// =============================

deleteAccount.addEventListener("click", () => {

    const confirmDelete = confirm(
        "Delete your account permanently?"
    );

    if (!confirmDelete) return;

    localStorage.clear();

    sessionStorage.clear();

    showToast("Account deleted.");

    setTimeout(() => {

        window.location.href = "register.html";

    }, 1500);

});

// =============================
// Dark Mode
// =============================

darkMode.addEventListener("change", () => {

    if (darkMode.checked) {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");

    }

});

// Apply saved dark mode

if (darkMode.checked) {

    document.body.classList.add("dark");

}

// =============================
// Toast
// =============================

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        toast.style.position = "fixed";
        toast.style.bottom = "100px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.background = "#111";
        toast.style.color = "#fff";
        toast.style.padding = "14px 22px";
        toast.style.borderRadius = "30px";
        toast.style.fontSize = "14px";
        toast.style.zIndex = "9999";
        toast.style.opacity = "0";
        toast.style.transition = ".3s";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.style.opacity = "1";

    setTimeout(() => {

        toast.style.opacity = "0";

    }, 2500);

}
