// =====================================
// admin-chat.js
// SeoulHomes Admin Chat
// =====================================

import { db } from "./firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =====================================
// Elements
// =====================================

const backBtn = document.getElementById("backBtn");
const refreshBtn = document.getElementById("refreshBtn");

const customerName = document.getElementById("customerName");
const customerAvatar = document.getElementById("customerAvatar");

const chatContainer = document.getElementById("chatContainer");

const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

const emojiBtn = document.getElementById("emojiBtn");

const attachBtn = document.getElementById("attachBtn");

// =====================================
// Selected Conversation
// =====================================

const uid =
    localStorage.getItem("adminChatUID");

const agent =
    localStorage.getItem("adminChatAgent");

if (!uid || !agent) {

    location.href =
        "admin-messages.html";

}

customerName.textContent = agent;

customerAvatar.src =
`https://i.pravatar.cc/150?u=${uid}`;

// =====================================
// Firestore
// =====================================

const messagesRef = collection(

    db,

    "users",

    uid,

    "chats",

    agent,

    "messages"

);

// =====================================
// Load Messages
// =====================================

function loadMessages() {

    const q = query(

        messagesRef,

        orderBy("timestamp")

    );

    onSnapshot(q, (snapshot) => {

        chatContainer.innerHTML =

        `<div class="chat-date">
            Today
        </div>`;

        snapshot.forEach((doc) => {

            const msg = doc.data();

            const div =
                document.createElement("div");

            div.className =

                msg.sender === "admin"

                ? "message sent"

                : "message received";

            const time =

                msg.timestamp

                ?

                msg.timestamp
                .toDate()
                .toLocaleTimeString([],{

                    hour:"2-digit",

                    minute:"2-digit"

                })

                :

                "";

            div.innerHTML =

            `

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

loadMessages();

// =====================================
// Send Reply
// =====================================

async function sendMessage() {

    const text =
        messageInput.value.trim();

    if (text==="") return;

    try{

        await addDoc(

            messagesRef,

            {

                sender:"admin",

                text:text,

                timestamp:serverTimestamp()

            }

        );

        messageInput.value="";

    }

    catch(error){

        console.error(error);

        alert("Unable to send message.");

    }

}

sendBtn.onclick = sendMessage;

messageInput.addEventListener(

    "keypress",

    (e)=>{

        if(e.key==="Enter"){

            e.preventDefault();

            sendMessage();

        }

    }

);

// =====================================
// Navigation
// =====================================

backBtn.onclick=()=>{

    history.back();

};

refreshBtn.onclick=()=>{

    location.reload();

};

// =====================================
// Emoji
// =====================================

emojiBtn.onclick=()=>{

    messageInput.value+="😊";

    messageInput.focus();

};

// =====================================
// Attachment
// =====================================

attachBtn.onclick=()=>{

    alert("Coming soon.");

};

// =====================================
// Scroll
// =====================================

function scrollBottom(){

    setTimeout(()=>{

        chatContainer.scrollTop=

        chatContainer.scrollHeight;

    },100);

}

messageInput.focus();

console.log("✅ Admin Chat Ready");
