const Database = require('better-sqlite3')

const db = new Database('tasks.db')


const statement = db.prepare('select * from tasks');

const result = statement.all();

console.log(result)

db.close();


