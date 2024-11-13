import { Hono } from 'hono';
import { registerUser, findUserByCredentials } from '../repository/userRepository';
import { cors } from 'hono/cors';

const userRoutes = new Hono();

userRoutes.use(
    '/*',
    cors({
      origin: 'http://localhost:5173',
    })
  );

userRoutes.post('/register', async (c) => {
  const { username, password } = await c.req.json();

  const existingUser = findUserByCredentials(username, password);
  if (existingUser) {
    return c.json({ message: 'Username is already taken' }, 400);
  }

  registerUser(username, password);
  return c.json({ message: 'User registered' }, 201);
});

userRoutes.post('/login', async (c) => {
  const { username, password } = await c.req.json();

  const user = findUserByCredentials(username, password);
  if (user) {
    return c.json({ message: 'Login successful' }, 200);
  } else {
    return c.json({ message: 'Invalid credentials' }, 401);
  }
});

export default userRoutes;
