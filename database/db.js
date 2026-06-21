const Database = require('better-sqlite3');


const db = new Database('./database/tasks.db');

module.exports = db;