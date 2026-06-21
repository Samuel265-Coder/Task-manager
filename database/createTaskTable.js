const Database = require('better-sqlite3');

const db = new Database('tasks.db');

db.exec(`
DROP TABLE IF EXISTS tasks;
`);

db.exec(`
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    user_id INTEGER NOT NULL,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
);
`);

console.log('Tasks table recreated');

db.close();