// dashboard-app.js

import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Global arrays
window.properties = [];
window.residentialProperties = [];
window.commercialProperties = [];

// Load properties from Firestore
export async function loadProperties() {

    try {

        const snapshot = await getDocs(
            collection(db, "properties")
        );

        window.properties = [];

        snapshot.forEach((doc) => {

            window.properties.push({
                id: doc.id,
                ...doc.data()
            });

        });

        window.commercialProperties =
            window.properties.filter(p =>
                (p.type || "").includes("Building") ||
                (p.type || "").includes("Office Use")
            );

        window.residentialProperties =
            window.properties.filter(p =>
                !(
                    (p.type || "").includes("Building") ||
                    (p.type || "").includes("Office Use")
                )
            );

        console.log(
            "Loaded",
            window.properties.length,
            "properties."
        );

        document.dispatchEvent(
            new Event("propertiesLoaded")
        );

    } catch (error) {

        console.error(
            "Error loading properties:",
            error
        );

    }

}

loadProperties();
