require("dotenv").config();
const mysql = require("mysql");

const connect = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",//process.env.DB_USER,
    password: "SuperSecretPasswordHere",//process.env.DB_PASS,
    database: "bamazon"
})

module.exports = connect