const Database = require('better-sqlite3')


const db = new Database('tasks.db');


const statement = db.prepare('update tasks set name=? where id=?')

const result = statement.run('Learn Django',1)

console.log(result)

db.close()