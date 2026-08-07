// ======================================
// admin-messages.js
// SeoulHomes Admin
// ======================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ======================================
// Elements
// ======================================

const chatList =
    document.getElementById("chatList");

const loading =
    document.getElementById("loading");

const emptyState =
    document.getElementById("emptyState");

const totalChats =
    document.getElementById("totalChats");

const unreadChats =
    document.getElementById("unreadChats");

const searchInput =
    document.getElementById("searchInput");

const refreshBtn =
    document.getElementById("refreshBtn");

// ======================================
// Variables
// ======================================

let conversations = [];

// ======================================
// Load Conversations
// ======================================

async function loadChats() {

    loading.style.display = "block";

    chatList.innerHTML = "";

    conversations = [];

    try {

        const usersSnapshot =
            await getDocs(
                collection(db, "users")
            );

        for (const userDoc of usersSnapshot.docs) {

            const chatsSnapshot =
                await getDocs(
                    collection(
                        db,
                        "users",
                        userDoc.id,
                        "chats"
                    )
                );

            for (const chatDoc of chatsSnapshot.docs) {

                const messagesSnapshot =
                    await getDocs(

                        query(

                            collection(
                                db,
                                "users",
                                userDoc.id,
                                "chats",
                                chatDoc.id,
                                "messages"
                            ),

                            orderBy(
                                "timestamp",
                                "desc"
                            ),

                            limit(1)

                        )

                    );

                let lastMessage = "";

                let time = "";

                messagesSnapshot.forEach((msg) => {

                    const data =
                        msg.data();

                    lastMessage =
                        data.text;

                    if (data.timestamp) {

                        time =
                            data.timestamp
                            .toDate()
                            .toLocaleTimeString([], {

                                hour: "2-digit",

                                minute: "2-digit"

                            });

                    }

                });

                conversations.push({

                    uid: userDoc.id,

                    agent: chatDoc.id,

                    lastMessage,

                    time

                });

            }

        }

        renderChats();

    }

    catch (error) {

        console.error(error);

        alert("Unable to load chats.");

    }

    loading.style.display = "none";

}

// ======================================
// Render Chats
// ======================================

function renderChats() {

    chatList.innerHTML = "";

    totalChats.textContent =
        conversations.length;

    unreadChats.textContent = 0;

    if (conversations.length === 0) {

        emptyState.style.display =
            "block";

        return;

    }

    emptyState.style.display =
        "none";

    conversations.forEach((chat) => {

        const card =
            document.createElement("div");

        card.className =
            "chat-card";

        card.innerHTML = `

        <div class="chat-left">

            <img
            class="chat-avatar"
            src="https://i.pravatar.cc/150?u=${chat.uid}">

            <div class="chat-info">

                <div class="chat-name">
                    ${chat.agent}
                </div>

                <div class="chat-email">
                    ${chat.uid}
                </div>

                <div class="chat-last">
                    ${chat.lastMessage}
                </div>

            </div>

        </div>

        <div class="chat-right">

            <div class="chat-time">
                ${chat.time}
            </div>

        </div>

        `;

        card.onclick = () => {

            localStorage.setItem(
                "adminChatUID",
                chat.uid
            );

            localStorage.setItem(
                "adminChatAgent",
                chat.agent
            );

            window.location.href =
                "admin-chat.html";

        };

        chatList.appendChild(card);

    });

}

// ======================================
// Search
// ======================================

searchInput.addEventListener("input", () => {

    const search =
        searchInput.value
        .toLowerCase();

    document
        .querySelectorAll(".chat-card")
        .forEach((card) => {

            const text =
                card.innerText
                .toLowerCase();

            card.style.display =
                text.includes(search)
                ? "flex"
                : "none";

        });

});

// ======================================
// Refresh
// ======================================

refreshBtn.onclick = loadChats;

// ======================================
// Start
// ======================================

loadChats();
