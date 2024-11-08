import { Hono } from 'hono';
import { registerUser, findUserByCredentials } from '../db/userRepository';

const userRoutes = new Hono();

userRoutes.post('/register', async (c) => {
  const { username, password } = await c.req.json();

  const existingUser = findUserByCredentials(username, password);
  if (existingUser) {
    return c.json({ message: 'Brukernavnet er allerede tatt' }, 400);
  }

  registerUser(username, password);
  return c.json({ message: 'Bruker registrert' }, 201);
});

export default userRoutes;