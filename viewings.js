// viewings.js

const backBtn = document.getElementById("backBtn");
const calendarBtn = document.getElementById("calendarBtn");

const viewingsList = document.getElementById("viewingsList");
const emptyState = document.getElementById("emptyState");

const totalViewings = document.getElementById("totalViewings");
const upcomingViewings = document.getElementById("upcomingViewings");
const completedViewings = document.getElementById("completedViewings");

// -----------------------------------
// Back Button
// -----------------------------------

backBtn.onclick = () => {

    history.back();

};

// -----------------------------------
// Refresh
// -----------------------------------

calendarBtn.onclick = () => {

    location.reload();

};

// -----------------------------------
// Load Viewings
// -----------------------------------

function loadViewings() {

    let bookings = [];

    viewingsList.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        if (key.startsWith("viewing_")) {

            bookings.push(
                JSON.parse(localStorage.getItem(key))
            );

        }

    }

    totalViewings.textContent = bookings.length;

    upcomingViewings.textContent = bookings.length;

    completedViewings.textContent = 0;

    if (bookings.length === 0) {

        emptyState.style.display = "block";

        viewingsList.style.display = "none";

        return;

    }

    emptyState.style.display = "none";

    viewingsList.style.display = "grid";

    bookings.forEach(property => {

        const card = document.createElement("div");

        card.className = "viewing-card";

        card.innerHTML = `

        <div class="viewing-image">

            <img src="${property.images[0]}">

        </div>

        <div class="viewing-content">

            <div class="viewing-price">

                ${property.saleType} • ${property.rent}

            </div>

            <div class="viewing-title">

                ${property.title}

            </div>

            <div class="viewing-info">

                <span>🛏 ${property.beds || "-"}</span>

                <span>🛁 ${property.baths || "-"}</span>

                <span>🏢 ${property.floor || "-"}</span>

            </div>

            <div class="schedule-box">

                <p>Viewing Date</p>

                <strong>

                ${property.viewingDate || "Not Selected"}

                </strong>

                <p style="margin-top:8px">

                Realtor: ${property.realtor}

                </p>

            </div>

            <div class="card-buttons">

                <button class="reschedule-btn">

                    Reschedule

                </button>

                <button class="cancel-btn">

                    Cancel

                </button>

            </div>

        </div>

        `;

        // Open Property

        card.querySelector(".viewing-image").onclick = () => {

            localStorage.setItem(
                "selectedProperty",
                JSON.stringify(property)
            );

            window.location.href = "agent.html";

        };

        // Cancel Viewing

        card.querySelector(".cancel-btn").onclick = () => {

            if (confirm("Cancel this viewing?")) {

                localStorage.removeItem(
                    "viewing_" + property.title
                );

                loadViewings();

            }

        };

        // Reschedule

        card.querySelector(".reschedule-btn").onclick = () => {

            const newDate = prompt(
                "Enter new viewing date:",
                property.viewingDate || ""
            );

            if (!newDate) return;

            property.viewingDate = newDate;

            localStorage.setItem(
                "viewing_" + property.title,
                JSON.stringify(property)
            );

            loadViewings();

        };

        viewingsList.appendChild(card);

    });

}

loadViewings();
