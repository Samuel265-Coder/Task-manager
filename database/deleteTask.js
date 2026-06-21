const Database = require('better-sqlite3')


const db = new Database('tasks.db');


const statement = db.prepare('delete from tasks where id=?')

const result = statement.run(1)

console.log(result)

db.close()