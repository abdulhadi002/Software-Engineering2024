import { setCookie } from 'hono/cookie';
import * as authService from '../service/authService';
import { Context } from 'hono';
import { AuthResult } from '../models/User';

export const login = async (c: Context) => {
  const { username, password } = await c.req.json();

  const result: AuthResult = await authService.authenticateUser(username, password);

  if (result.success) {
    setCookie(c, 'user_id', result.user.id.toString(), {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return c.json({ message: 'Innlogging vellykket' });
  } else {
    return c.json({ message: result.message }, 401);
  }
};

export const register = async (c: Context) => {
  const { username, password } = await c.req.json();

  const result: AuthResult = await authService.registerUser(username, password);

  if (result.success) {
    setCookie(c, 'user_id', result.user.id.toString(), {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return c.json({ message: 'Bruker registrert' }, 201);
  } else {
    return c.json({ message: result.message }, 400);
  }
};