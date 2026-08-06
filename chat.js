// chat.js

// ==========================
// Elements
// ==========================

const backBtn = document.getElementById("backBtn");
const callBtn = document.getElementById("callBtn");

const chatContainer = document.getElementById("chatContainer");
const typingIndicator = document.getElementById("typingIndicator");

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const attachBtn = document.getElementById("attachBtn");
const emojiBtn = document.getElementById("emojiBtn");

const agentName = document.getElementById("agentName");

// ==========================
// Load Selected Agent
// ==========================

const selectedAgent =
    localStorage.getItem("selectedAgent");

if (selectedAgent) {
    agentName.textContent = selectedAgent;
}

// ==========================
// Back
// ==========================

backBtn.onclick = () => {

    history.back();

};

// ==========================
// Call Agent
// ==========================

callBtn.onclick = () => {

    window.location.href =
        "tel:+821023456789";

};

// ==========================
// Send Message
// ==========================

sendBtn.onclick = sendMessage;

messageInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

});

function sendMessage() {

    const text = messageInput.value.trim();

    if (text === "") return;

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const message = document.createElement("div");

    message.className = "message sent";

    message.innerHTML = `

        <div class="bubble">
            ${text}
        </div>

        <span class="time">
            ${time}
        </span>

    `;

    chatContainer.appendChild(message);

    messageInput.value = "";

    scrollBottom();

    autoReply();

}

// ==========================
// Auto Reply
// ==========================

function autoReply() {

    typingIndicator.style.display = "flex";

    scrollBottom();

    setTimeout(() => {

        typingIndicator.style.display = "none";

        const replies = [

            "Thank you for your message.",

            "I'll get back to you shortly.",

            "The property is still available.",

            "Would you like to schedule a viewing?",

            "I'll send you more photos shortly.",

            "Thanks for contacting SeoulHomes."

        ];

        const randomReply =
            replies[Math.floor(Math.random() * replies.length)];

        const now = new Date();

        const time = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

        const reply = document.createElement("div");

        reply.className = "message received";

        reply.innerHTML = `

            <div class="bubble">
                ${randomReply}
            </div>

            <span class="time">
                ${time}
            </span>

        `;

        chatContainer.appendChild(reply);

        scrollBottom();

    }, 1800);

}

// ==========================
// Scroll
// ==========================

function scrollBottom() {

    chatContainer.scrollTop =
        chatContainer.scrollHeight;

}

// ==========================
// Attach File
// ==========================

attachBtn.onclick = () => {

    alert("File sharing will be available soon.");

};

// ==========================
// Emoji
// ==========================

emojiBtn.onclick = () => {

    messageInput.value += "😊";

    messageInput.focus();

};

// ==========================
// Focus Input
// ==========================

messageInput.focus();

// ==========================
// Initial Scroll
// ==========================

scrollBottom();
