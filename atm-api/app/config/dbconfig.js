let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("./db/atm.db");

let init = function() {
    // db.run("CREATE TABLE if not exists student (" +
    // "id INTEGER PRIMARY KEY," +
    // " firstName TEXT," +
    // " lastName TEXT," +
    // " dob TEXT," +
    // " phone TEXT," +
    // " email TEXT" +
    // ")");
}

module.exports = {
    init: init, 
    db: db
}