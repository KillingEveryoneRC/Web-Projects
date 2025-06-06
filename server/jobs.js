// server/jobs.js
const express = require("express");
const admin = require("./firebase");

const router = express.Router();

// Додавання вакансії (тільки авторизовані)
router.post("/vacancies", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        const uid = decoded.uid;

        const db = admin.firestore();
        const { company, title, salary, location, type, experience } = req.body;

        const vacancy = {
            company,
            title,
            salary,
            location,
            type,
            experience,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            uid
        };

        await db.collection("vacancies").add(vacancy);

        res.status(201).json({ message: "Vacancy added" });
    } catch (error) {
        console.error("Add vacancy error:", error.message);
        res.status(403).json({ message: "Invalid token" });
    }
});

module.exports = router;
