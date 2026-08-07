// ===============================
// chat.js - PART 1
// Firebase Setup & Load Messages
// ===============================

import { auth, db } from "./firebase.js";

import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ==========================
// Elements
// ==========================

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

// ==========================
// Current User
// ==========================
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Start the chat here
});


// ==========================
// Selected Agent
// ==========================

const selectedAgent =
    localStorage.getItem("selectedAgent") ||
    "Emily Kim";

agentName.textContent = selectedAgent;

// ==========================
// Firestore Collection
// ==========================

const messagesRef = collection(
    db,
    "users",
    user.uid,
    "chats",
    selectedAgent,
    "messages"
);

// ==========================
// Load Messages
// ==========================

const messagesQuery = query(
    messagesRef,
    orderBy("timestamp")
);

onSnapshot(messagesQuery, (snapshot) => {

    chatContainer.innerHTML =
        '<div class="chat-date">Today</div>';

    snapshot.forEach((doc) => {

        const msg = doc.data();

        const div =
            document.createElement("div");

        div.className =
            msg.sender === "user"
            ? "message sent"
            : "message received";

        const time = msg.timestamp
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
// ==========================
// PART 2
// Send Messages
// ==========================

// Send Button
sendBtn.onclick = sendMessage;

// Enter Key
messageInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// --------------------------
// Send Message
// --------------------------

async function sendMessage() {

    const text = messageInput.value.trim();

    if (text === "") return;

    try {

        await addDoc(messagesRef, {

            text: text,

            sender: "user",

            timestamp: serverTimestamp()

        });

        messageInput.value = "";

        autoReply();

    } catch (error) {

        console.error(error);

        alert("Unable to send message.");

    }

}

// ==========================
// Auto Reply
// ==========================

async function autoReply() {

    typingIndicator.style.display = "flex";

    scrollBottom();

    const replies = [

        "Thank you for your message.",

        "The property is still available.",

        "Would you like to schedule a viewing?",

        "I'll send you more photos shortly.",

        "Our realtor will contact you soon.",

        "Thanks for contacting SeoulHomes."

    ];

    const randomReply =

        replies[
            Math.floor(
                Math.random() * replies.length
            )
        ];

    setTimeout(async () => {

        typingIndicator.style.display = "none";

        try {

            await addDoc(messagesRef, {

                text: randomReply,

                sender: "agent",

                timestamp: serverTimestamp()

            });

        } catch (error) {

            console.error(error);

        }

    }, 1800);

}

// ==========================
// Emoji
// ==========================

emojiBtn.onclick = () => {

    messageInput.value += "😊";

    messageInput.focus();

};

// ==========================
// Attachment
// ==========================

attachBtn.onclick = () => {

    alert(
        "File sharing will be available soon."
    );

};
// ==========================
// PART 3
// Back
// Call
// Scroll
// Focus
// ==========================

// --------------------------
// Back Button
// --------------------------

backBtn.onclick = () => {

    history.back();

};

// --------------------------
// Call Agent
// --------------------------

callBtn.onclick = () => {

    window.location.href =
        "tel:+821023456789";

};

// --------------------------
// Scroll to Bottom
// --------------------------

function scrollBottom() {

    setTimeout(() => {

        chatContainer.scrollTop =
            chatContainer.scrollHeight;

    }, 100);

}

// --------------------------
// Focus Input
// --------------------------

messageInput.focus();

// --------------------------
// Keep Input Focus
// --------------------------

messageInput.addEventListener("blur", () => {

    setTimeout(() => {

        messageInput.focus();

    }, 200);

});

// --------------------------
// Auto Scroll on Page Load
// --------------------------

window.addEventListener("load", () => {

    scrollBottom();

});

// --------------------------
// Connection Status
// --------------------------

window.addEventListener("online", () => {

    console.log("Connected to internet.");

});

window.addEventListener("offline", () => {

    alert(
        "You're offline. Messages will send when your connection is restored."
    );

});

// --------------------------
// Typing Indicator Default
// --------------------------

typingIndicator.style.display = "none";

// --------------------------
// Page Visibility
// --------------------------

document.addEventListener("visibilitychange", () => {

    if (!document.hidden) {

        scrollBottom();

    }

});

console.log("✅ Firestore Chat Loaded Successfully");
