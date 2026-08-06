// agent.js

const property = JSON.parse(localStorage.getItem("selectedProperty"));

if (!property) {
    window.location.href = "dashboard.html";
}

const mainImage = document.getElementById("mainImage");
const thumbs = document.getElementById("thumbs");

const propertyTitle = document.getElementById("propertyTitle");
const propertyPrice = document.getElementById("propertyPrice");
const propertyDeposit = document.getElementById("propertyDeposit");
const propertyType = document.getElementById("propertyType");
const propertyBeds = document.getElementById("propertyBeds");
const propertyBaths = document.getElementById("propertyBaths");
const propertyFloor = document.getElementById("propertyFloor");
const propertyAgent = document.getElementById("propertyAgent");
const propertyDate = document.getElementById("propertyDate");
const propertyDescription = document.getElementById("propertyDescription");

mainImage.src = property.images[0];

thumbs.innerHTML = "";

property.images.forEach((img) => {

    thumbs.innerHTML += `
        <img src="${img}" class="thumb">
    `;

});

document.querySelectorAll(".thumb").forEach((thumb) => {

    thumb.onclick = () => {

        mainImage.src = thumb.src;

    };

});

propertyTitle.textContent = property.title;

propertyPrice.textContent =
property.saleType + " • " + property.rent;

propertyDeposit.textContent =
property.deposit || "No deposit";

propertyType.textContent =
property.type;

propertyBeds.textContent =
property.beds || "-";

propertyBaths.textContent =
property.baths || "-";

propertyFloor.textContent =
property.floor || "-";

propertyAgent.textContent =
property.realtor;

propertyDate.textContent =
property.date;

propertyDescription.textContent =
"This beautiful property is located in one of Seoul's most desirable neighborhoods. It offers modern interiors, excellent transportation links, nearby restaurants, shopping malls, schools and a peaceful environment. Contact the agent today to arrange a viewing.";


// Save Property

const saveBtn = document.getElementById("saveBtn");

const saveKey =
"saved_" + property.title;

if(localStorage.getItem(saveKey)){
    saveBtn.innerHTML="❤️ Saved";
}

saveBtn.onclick=()=>{

    if(localStorage.getItem(saveKey)){

        localStorage.removeItem(saveKey);

        saveBtn.innerHTML="🤍 Save";

    }else{

        localStorage.setItem(saveKey,JSON.stringify(property));

        saveBtn.innerHTML="❤️ Saved";

    }

};


// Contact Agent

document.getElementById("contactBtn").onclick=()=>{

    alert(
`Agent: ${property.realtor}

Phone:
+82 10-2345-6789

Email:
agent@seoulhomes.com`
);

};


// Book Viewing

document.getElementById("bookBtn").onclick=()=>{

    alert(
"Viewing request sent successfully.\n\nThe agent will contact you shortly."
    );

};


// Share

document.getElementById("shareBtn").onclick=()=>{

    if(navigator.share){

        navigator.share({

            title:property.title,

            text:property.title,

            url:window.location.href

        });

    }else{

        navigator.clipboard.writeText(window.location.href);

        alert("Property link copied.");

    }

};


// Back Button

document.getElementById("backBtn").onclick=()=>{

    history.back();

};
