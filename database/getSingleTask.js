const Database = require('better-sqlite3')


const db = new Database('tasks.db');


const statement = db.prepare('select * from tasks where id=?')

const result = statement.get(1)

console.log(result)

db.close()