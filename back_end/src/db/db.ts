import Database from 'better-sqlite3';

const db = new Database('database.db', { verbose: console.log });

export type DB = typeof db;
export default db;
