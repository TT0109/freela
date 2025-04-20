import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPathLocal = path.resolve(__dirname, "collection.db");

const dbPath = process.env.VERCEL
  ? "/tmp/collection.db"
  : dbPathLocal;

if (process.env.VERCEL && fs.existsSync(dbPathLocal)) {
  fs.copyFileSync(dbPathLocal, dbPath);
}

const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error("Erro ao conectar ao SQLite:", err.message);
    }

    console.log("Connected to the SQLite database.");

    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS TbEmails (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS TbBusca (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          idEmailBuscou INTEGER NOT NULL,
          username TEXT NOT NULL,
          FOREIGN KEY (idEmailBuscou) REFERENCES TbEmails(id)
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS TbHistorico (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          idBusca INTEGER NOT NULL,
          resultadoQtd INTEGER,
          dataExecucao DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (idBusca) REFERENCES TbBusca(id)
        )
      `);

      console.log("Tabelas criadas com sucesso.");
    });
  }
);

export default db;
