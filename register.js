import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const createBtn = document.getElementById("createBtn");

createBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = fullName.value.trim();
    const userEmail = email.value.trim();
    const userPassword = password.value;
    const confirmPassword = confirm.value;

    if (!name || !userEmail || !userPassword || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (userPassword.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    if (userPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const requiredChecks = document.querySelectorAll(".req");

    for (const check of requiredChecks) {
        if (!check.checked) {
            alert("Please accept all required terms.");
            return;
        }
    }

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            userEmail,
            userPassword
        );

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            fullName: name,
            email: userEmail,
            uid: user.uid,
            createdAt: serverTimestamp()
        });

        alert("Account created successfully!");

        window.location.href = "login.html";

    } catch (error) {

        switch (error.code) {

            case "auth/email-already-in-use":
                alert("This email is already registered.");
                break;

            case "auth/invalid-email":
                alert("Please enter a valid email.");
                break;

            case "auth/weak-password":
                alert("Password is too weak.");
                break;

            default:
                alert(error.message);
        }
    }
});

// Password show/hide

document.querySelectorAll(".eye").forEach((eye) => {

    eye.addEventListener("click", () => {

        const input = document.getElementById(
            eye.getAttribute("data-toggle")
        );

        input.type =
            input.type === "password"
                ? "text"
                : "password";
    });

});

// Agree All

const agreeAll = document.getElementById("agreeAll");

agreeAll.addEventListener("change", () => {

    document.querySelectorAll(".checks input[type='checkbox']")
        .forEach(cb => cb.checked = agreeAll.checked);

});
