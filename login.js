import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const signInBtn = document.getElementById("signinBtn");
const keep = document.getElementById("keep");
const forgotLink = document.getElementById("forgotLink");
const toggleEye = document.getElementById("toggleEye");

// Redirect if already signed in
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "dashboard.html";
    }
});

// Show/Hide password
toggleEye.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        toggleEye.textContent = "🙈";
    } else {
        password.type = "password";
        toggleEye.textContent = "👁";
    }
});

// Login
signInBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const userEmail = email.value.trim();
    const userPassword = password.value;

    if (!userEmail || !userPassword) {
        alert("Please enter your email and password.");
        return;
    }

    try {

        await setPersistence(
            auth,
            keep.checked
                ? browserLocalPersistence
                : browserSessionPersistence
        );

        await signInWithEmailAndPassword(
            auth,
            userEmail,
            userPassword
        );

        alert("Login successful!");

        window.location.href = "index.html";

    } catch (error) {

        switch (error.code) {

            case "auth/invalid-credential":
                alert("Invalid email or password.");
                break;

            case "auth/user-not-found":
                alert("Account not found.");
                break;

            case "auth/wrong-password":
                alert("Incorrect password.");
                break;

            case "auth/invalid-email":
                alert("Please enter a valid email.");
                break;

            case "auth/too-many-requests":
                alert("Too many attempts. Please try again later.");
                break;

            default:
                alert(error.message);
        }

    }
});

// Forgot Password
forgotLink.addEventListener("click", async (e) => {
    e.preventDefault();

    const userEmail = email.value.trim();

    if (!userEmail) {
        alert("Enter your email address first.");
        return;
    }

    try {

        await sendPasswordResetEmail(auth, userEmail);

        alert("Password reset email has been sent.");

    } catch (error) {
        alert(error.message);
    }
});
