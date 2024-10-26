import Database from 'better-sqlite3';

const db = new Database('dev.db', { verbose: console.log });
export default db;
