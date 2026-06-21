const Database = require('better-sqlite3');

const db = new Database('tasks.db');

const statement = db.prepare(
    'INSERT INTO tasks(name) VALUES (?)'
);

const result = statement.run(
    'Learn SQLite'
);

console.log(result);

db.close();