// saved-properties.js

const savedList = document.getElementById("savedList");
const emptyState = document.getElementById("emptyState");
const savedCount = document.getElementById("savedCount");

// ----------------------
// Load Saved Properties
// ----------------------

function loadSavedProperties() {

    savedList.innerHTML = "";

    let savedProperties = [];

    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        if (key.startsWith("saved_")) {

            savedProperties.push(
                JSON.parse(localStorage.getItem(key))
            );

        }

    }

    savedCount.textContent = savedProperties.length;

    if (savedProperties.length === 0) {

        savedList.style.display = "none";
        emptyState.style.display = "block";

        return;

    }

    savedList.style.display = "grid";
    emptyState.style.display = "none";

    savedProperties.forEach(property => {

        const card = document.createElement("div");

        card.className = "saved-card";

        card.innerHTML = `

        <div class="saved-image">

            <img src="${property.images[0]}" alt="">

            <button class="remove-btn">
                <i class="fa-solid fa-heart"></i>
            </button>

        </div>

        <div class="saved-content">

            <div class="saved-price">

                ${property.saleType} • ${property.rent}

            </div>

            <div class="saved-deposit">

                ${property.deposit || "No Deposit"}

            </div>

            <div class="saved-title">

                ${property.title}

            </div>

            <div class="saved-meta">

                <span>🛏 ${property.beds || "-"}</span>

                <span>🛁 ${property.baths || "-"}</span>

                <span>🏢 ${property.floor || "-"}</span>

            </div>

            <div class="saved-agent">

                <div class="agent-left">

                    <img src="https://i.pravatar.cc/100?u=${property.realtor}">

                    <div>

                        <div class="agent-name">

                            ${property.realtor}

                        </div>

                        <div class="agent-role">

                            Verified Realtor

                        </div>

                    </div>

                </div>

            </div>

            <button class="view-btn">

                View Property

            </button>

        </div>

        `;

        // Open Property

        card.querySelector(".view-btn").onclick = () => {

            localStorage.setItem(
                "selectedProperty",
                JSON.stringify(property)
            );

            window.location.href = "agent.html";

        };

        // Remove Saved

        card.querySelector(".remove-btn").onclick = (e) => {

            e.stopPropagation();

            localStorage.removeItem(
                "saved_" + property.title
            );

            loadSavedProperties();

        };

        savedList.appendChild(card);

    });

}

// ----------------------
// Back
// ----------------------

document.getElementById("backBtn").onclick = () => {

    history.back();

};

// ----------------------
// Refresh
// ----------------------

document.getElementById("refreshBtn").onclick = () => {

    loadSavedProperties();

};

// ----------------------
// Initial Load
// ----------------------

loadSavedProperties();
