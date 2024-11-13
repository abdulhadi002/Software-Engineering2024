import * as authService from '../service/authService';
import { Context } from 'hono';

export const login = async (c: Context) => {
  const { username, password } = await c.req.json();

  const result = authService.authenticateUser(username, password);

  if (result.success) {
    return c.json({ message: 'Innlogging vellykket', user: result.user });
  } else {
    return c.json({ message: result.message }, 401);
  }
};

export const register = async (c: Context) => {
  const { username, password } = await c.req.json();

  const result = authService.registerUser(username, password);

  if (result.success) {
    return c.json({ message: 'Bruker registrert', user: result.user }, 201);
  } else {
    return c.json({ message: result.message }, 400);
  }
};
