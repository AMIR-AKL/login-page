const mysql = require("mysql");
const loginpageDb = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "loginpage-db",
});

module.exports = loginpageDb;
