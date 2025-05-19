import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { db } from '../firebase/firebaseConfig.js';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

const router = express.Router();

// Отримати всі заявки користувача
router.get('/', authMiddleware, async (req, res) => {
    const q = query(
        collection(db, 'applications'),
        where('user', '==', req.user.email)
    );
    const snapshot = await getDocs(q);
    const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(apps);
});

// Додати нову заявку
router.post('/', authMiddleware, async (req, res) => {
    const { jobId, resume } = req.body;
    const q = query(
        collection(db, 'applications'),
        where('user', '==', req.user.email),
        where('jobId', '==', jobId)
    );
    const duplicate = await getDocs(q);
    if (!duplicate.empty)
        return res.status(400).json({ message: 'Already applied to this job' });

    await addDoc(collection(db, 'applications'), {
        user: req.user.email,
        jobId,
        resume,
        date: new Date()
    });

    res.status(201).json({ message: 'Application submitted' });
});

export default router;
