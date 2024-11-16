import * as authService from '../service/authService';
import { Context } from 'hono';
import db from '../db/db';

export const login = async (c: Context) => {
  const { username, password } = await c.req.json();
  
  // Hent brukeren fra databasen
  const user = await db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  
  if (user && user.password === password) {
    // Suksess hvis passordet stemmer
    return c.json({ message: 'Innlogging vellykket', user: { username: user.username } });
  } else {
    // Feilmelding hvis brukernavn eller passord er feil
    return c.json({ message: 'Ugyldig brukernavn eller passord' }, 401);
  }
};

export const register = async (c: Context) => {
  const { username, password } = await c.req.json();

  // Sjekk om brukeren allerede eksisterer
  const existingUser = await db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  
  if (existingUser) {
    return c.json({ message: 'Brukernavnet er allerede tatt' }, 400);
  }

  try {
    // Sett inn brukernavn og passord direkte (ingen kryptering)
    await db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, password);
    return c.json({ message: 'Bruker registrert', user: { username } }, 201);
  } catch (error) {
    console.error('Feil ved registrering:', error);
    return c.json({ message: 'Serverfeil under registrering' }, 500);
  }
};
