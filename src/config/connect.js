import sqlite3 from 'sqlite3'
const sql3 = sqlite3.verbose();

const db = new sql3.Database('database.db', sql3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log('Połączoną z bazą danych');

    db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL
    )`,
    [], (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log("Tabela wczytana");
    });
});

export default db