const myql2 = require("mysql2");
const conection = myql2.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "prozeckmd3",
    port: 3306,
});

const database = conection.promise();

module.exports = database;