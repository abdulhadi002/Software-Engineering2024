import express from 'express';
import { getAllUsers, createUser } from '../controllers/UserController';

const router = express.Router();

router.get('/users', (req, res) => {
    const users = getAllUsers();
    res.json(users);
});

router.post('/users', (req, res) => {
    const { id, username, email, createdAt } = req.body;
    createUser({ id, username, email, createdAt: new Date(createdAt) });
    res.status(201).send('User created');
});

export default router;
