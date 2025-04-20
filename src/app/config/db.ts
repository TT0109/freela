import sqlite3 from "sqlite3";

const db = new sqlite3.Database(
  "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQLite database.");

    db.serialize(() => {
      // Criação da tabela de e-mails
      db.run(`
        CREATE TABLE IF NOT EXISTS TbEmails (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL
        )
      `);

      // Criação da tabela de buscas
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
