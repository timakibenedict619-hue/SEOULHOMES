import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const createBtn = document.getElementById("createBtn");
const googleRegisterBtn = document.getElementById("googleRegisterBtn");
const agreeAll = document.getElementById("agreeAll");

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

function requiredTermsAccepted() {
  const requiredChecks = document.querySelectorAll(".req");

  for (const check of requiredChecks) {
    if (!check.checked) {
      alert("Please accept all required terms.");
      return false;
    }
  }

  return true;
}

async function saveUserProfile(user, name = "") {
  const userRef = doc(db, "users", user.uid);
  const existingUser = await getDoc(userRef);

  if (!existingUser.exists()) {
    await setDoc(userRef, {
      fullName: name || user.displayName || "",
      email: user.email || "",
      uid: user.uid,
      createdAt: serverTimestamp()
    });

    return;
  }

  if (name) {
    await setDoc(
      userRef,
      {
        fullName: name
      },
      { merge: true }
    );
  }
}

// Email and password registration
createBtn.addEventListener("click", async (event) => {
  event.preventDefault();

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

  if (!requiredTermsAccepted()) {
    return;
  }

  const originalButtonText = createBtn.textContent;

  try {
    createBtn.disabled = true;
    createBtn.textContent = "Creating account...";

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );

    await saveUserProfile(userCredential.user, name);

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
  } finally {
    createBtn.disabled = false;
    createBtn.textContent = originalButtonText;
  }
});

// Google registration
googleRegisterBtn.addEventListener("click", async () => {
  if (!requiredTermsAccepted()) {
    return;
  }

  const originalButtonContent = googleRegisterBtn.innerHTML;

  try {
    googleRegisterBtn.disabled = true;
    googleRegisterBtn.textContent = "Connecting to Google...";

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    await saveUserProfile(user, fullName.value.trim());

    alert("Google account connected successfully!");
    window.location.href = "login.html";
  } catch (error) {
    switch (error.code) {
      case "auth/popup-closed-by-user":
        alert("Google sign-in was cancelled.");
        break;

      case "auth/popup-blocked":
        alert("Your browser blocked the Google sign-in window. Please allow pop-ups and try again.");
        break;

      case "auth/account-exists-with-different-credential":
        alert("An account already exists with this email using a different sign-in method.");
        break;

      default:
        alert(error.message);
    }
  } finally {
    googleRegisterBtn.disabled = false;
    googleRegisterBtn.innerHTML = originalButtonContent;
  }
});

// Password show/hide
document.querySelectorAll(".eye").forEach((eye) => {
  eye.addEventListener("click", () => {
    const input = document.getElementById(
      eye.getAttribute("data-toggle")
    );

    input.type = input.type === "password" ? "text" : "password";
  });
});

// Agree all checkboxes
agreeAll.addEventListener("change", () => {
  document
    .querySelectorAll(".checks input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.checked = agreeAll.checked;
    });
});
