import express from 'express';
import * as authService from '../service/authService';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const result = authService.authenticateUser(username, password);

  if (result.success) {
    res.json({ message: 'Innlogging vellykket', user: result.user });
  } else {
    res.status(401).json({ message: result.message });
  }
});

export default router;
