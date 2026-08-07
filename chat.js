// =========================================
// chat.js
// PART 1
// Firebase Authentication & Chat Loading
// =========================================

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =========================================
// DOM Elements
// =========================================

const backBtn = document.getElementById("backBtn");

const callBtn = document.getElementById("callBtn");

const chatContainer =
    document.getElementById("chatContainer");

const typingIndicator =
    document.getElementById("typingIndicator");

const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");

const attachBtn =
    document.getElementById("attachBtn");

const emojiBtn =
    document.getElementById("emojiBtn");

const agentName =
    document.getElementById("agentName");

// =========================================
// Variables
// =========================================

let currentUser = null;

let messagesRef = null;

const selectedAgent =
    localStorage.getItem("selectedAgent") ||
    "Emily Kim";

agentName.textContent = selectedAgent;

// =========================================
// Wait For Login
// =========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    currentUser = user;

    // Create the chat document if it doesn't exist
    await setDoc(

        doc(
            db,
            "users",
            currentUser.uid,
            "chats",
            selectedAgent
        ),

        {
            agent: selectedAgent,
            updatedAt: serverTimestamp()
        },

        { merge: true }

    );

    // Messages collection
    messagesRef = collection(
        db,
        "users",
        currentUser.uid,
        "chats",
        selectedAgent,
        "messages"
    );

    loadMessages();

});

// =========================================
// Load Messages
// =========================================

function loadMessages() {

    const q = query(
        messagesRef,
        orderBy("timestamp")
    );

    onSnapshot(q, (snapshot) => {

        chatContainer.innerHTML = `

            <div class="chat-date">
                Today
            </div>

        `;

        snapshot.forEach((doc) => {

            const msg = doc.data();

            const div =
                document.createElement("div");

            div.className =
                msg.sender === "user"
                ? "message sent"
                : "message received";

            const time =
                msg.timestamp
                ? msg.timestamp
                      .toDate()
                      .toLocaleTimeString([], {

                          hour: "2-digit",

                          minute: "2-digit"

                      })
                : "";

            div.innerHTML = `

                <div class="bubble">

                    ${msg.text}

                </div>

                <span class="time">

                    ${time}

                </span>

            `;

            chatContainer.appendChild(div);

        });

        scrollBottom();

    });

                        }
// =========================================
// PART 2
// Send Messages
// =========================================

// Send Button
sendBtn.addEventListener("click", sendMessage);

// Enter Key
messageInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        sendMessage();

    }

});

// =========================================
// Send Message
// =========================================

async function sendMessage() {

    const text = messageInput.value.trim();

    if (text === "") return;

    try {

        await addDoc(messagesRef, {

            sender: "user",

            text: text,

            timestamp: serverTimestamp()

        });

        messageInput.value = "";

        

    }

    catch (error) {

        console.error(error);

        alert("Unable to send message.");

    }

}

// =========================================
// Automatic Agent Reply
// =========================================



// =========================================
// PART 3
// Navigation & UI
// =========================================

// -------------------------
// Back Button
// -------------------------

backBtn.addEventListener("click", () => {

    history.back();

});

// -------------------------
// Call Agent
// -------------------------

callBtn.addEventListener("click", () => {

    window.location.href =
        "tel:+821023456789";

});

// -------------------------
// Emoji
// -------------------------

emojiBtn.addEventListener("click", () => {

    messageInput.value += "😊";

    messageInput.focus();

});

// -------------------------
// Attachment
// -------------------------

attachBtn.addEventListener("click", () => {

    alert(
        "File sharing will be available soon."
    );

});

// =========================================
// Scroll Chat
// =========================================

function scrollBottom() {

    setTimeout(() => {

        chatContainer.scrollTop =
            chatContainer.scrollHeight;

    }, 100);

}

// =========================================
// Typing Indicator
// =========================================

typingIndicator.style.display = "none";

// =========================================
// Focus Input
// =========================================

window.addEventListener("load", () => {

    messageInput.focus();

    scrollBottom();

});

// =========================================
// Online / Offline
// =========================================

window.addEventListener("online", () => {

    console.log("Connected");

});

window.addEventListener("offline", () => {

    alert(
        "You are offline. Messages will send when your internet connection is restored."
    );

});

// =========================================
// Refresh Scroll
// =========================================

document.addEventListener("visibilitychange", () => {

    if (!document.hidden) {

        scrollBottom();

    }

});

console.log("✅ chat.js loaded successfully");
// =========================================
// PART 4
// Final Initialization
// =========================================

// Keep focus on input after sending
messageInput.addEventListener("blur", () => {

    setTimeout(() => {

        messageInput.focus();

    }, 200);

});

// Hide typing indicator initially
typingIndicator.style.display = "none";

// Scroll to latest message
scrollBottom();

// Debug
console.log("=================================");
console.log("SeoulHomes Chat");
console.log("Current Agent:", selectedAgent);
console.log("Firebase Chat Ready");
console.log("=================================");
