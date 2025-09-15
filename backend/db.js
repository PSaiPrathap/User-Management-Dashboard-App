import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        about TEXT,
        phone TEXT,
        address TEXT,
        geo TEXT,
        company TEXT
      )
    `);
  }
});

export default db;
