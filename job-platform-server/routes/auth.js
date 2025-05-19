import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

const users = []; // Для демонстрації, замінити на Firestore

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    users.push({ email, password: hashed });
    res.status(201).json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

router.get('/profile', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'No token' });

    const token = auth.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: decoded.email });
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
});

export default router;
