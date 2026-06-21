const Database = require('better-sqlite3');

const db = new Database('tasks.db');

db.exec(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
)
`);

// console.log('Tasks table created');

db.close();