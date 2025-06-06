// server/auth.js
const express = require("express");
const admin = require("./firebase");
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        res.status(201).send("User created successfully");
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).send(error.message);
    }
});

// auth.js (додати після /register)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Firebase Admin SDK не підтримує автентифікацію з паролем.
        // Тому логіку перевірки робимо через Firebase REST API

        const response = await (await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        }));

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Authentication failed");
        }

        // Токен доступу: data.idToken
        res.json({ token: data.idToken });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(401).send(error.message);
    }
});

// auth.js (додати нижче)
router.get("/profile", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        const uid = decoded.uid;

        const db = admin.firestore();
        const doc = await db.collection("profiles").doc(uid).get();

        res.json(doc.exists ? doc.data() : {});
    } catch (error) {
        console.error("Profile fetch error:", error.message);
        res.status(403).send({ message: "Invalid token" });
    }
});

router.post("/profile", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        const uid = decoded.uid;

        const db = admin.firestore();
        await db.collection("profiles").doc(uid).set(req.body);

        res.json({ message: "Profile updated" });
    } catch (error) {
        console.error("Profile update error:", error.message);
        res.status(403).send({ message: "Invalid token" });
    }
});

module.exports = router;
