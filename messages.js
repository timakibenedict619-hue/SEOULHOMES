// messages.js

// -------------------------
// Back Button
// -------------------------
const backBtn = document.getElementById("backBtn");

if (backBtn) {
    backBtn.onclick = () => history.back();
}

// -------------------------
// Search Messages
// -------------------------
const searchInput = document.getElementById("searchInput");
const chatCards = document.querySelectorAll(".chat-card");
const emptyState = document.getElementById("emptyState");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const search = searchInput.value.toLowerCase();

        let visible = 0;

        chatCards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(search)) {

                card.style.display = "flex";
                visible++;

            } else {

                card.style.display = "none";

            }

        });

        if (visible === 0) {

            emptyState.style.display = "block";

        } else {

            emptyState.style.display = "none";

        }

    });

}

// -------------------------
// Open Chat
// -------------------------
chatCards.forEach(card => {

    card.addEventListener("click", () => {

        const agentName =
            card.querySelector("h3").textContent;

        const agentImage =
            card.querySelector("img").src;

        localStorage.setItem("selectedAgent", agentName);
        localStorage.setItem("selectedAgentImage", agentImage);

        window.location.href = "chat.html";

    });

});

// -------------------------
// New Chat
// -------------------------
const newChatBtn =
document.getElementById("newChatBtn");

if (newChatBtn) {

    newChatBtn.onclick = () => {

        alert(
            "Search for a property and contact a realtor to start a conversation."
        );

    };

}

// -------------------------
// Highlight Active Chat
// -------------------------
chatCards.forEach(card => {

    card.addEventListener("mousedown", () => {

        card.style.background = "#f3f6ff";

    });

    card.addEventListener("mouseup", () => {

        card.style.background = "#ffffff";

    });

});

// -------------------------
// Show Empty State
// -------------------------
if (chatCards.length === 0) {

    emptyState.style.display = "block";

} else {

    emptyState.style.display = "none";

}
