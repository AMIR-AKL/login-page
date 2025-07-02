const express = require("express");
const loginpageDb = require("../db/loginpageDb");
const { json } = require("body-parser");
const userRoutes = express.Router();
userRoutes.post("/", (req, res) => {
	console.log("coonect to db:)");
	const body = req.body;
	let newUserInsertQuery = `INSERT INTO users VALUES (NULL, "${body.firstname}" , "${body.lastname}" , "${body.email}","${body.password}" )`;
	loginpageDb.query(newUserInsertQuery, (error, result) => {
		if (error) {
			console.log("you have error =>", error);
		} else {
			console.log("new user inserted:)");
			res.send(true);
		}
	});
});
userRoutes.get("/all", (req, res) => {
	let getAllUsersQuery = `SELECT * FROM users`;
	loginpageDb.query(getAllUsersQuery, (err, result) => {
		if (err) {
			console.log("error to get users");
		} else {
			console.log("get users true");
			res.send(JSON.stringify(result));
		}
	});
});

userRoutes.delete("/remove/:userID", (req, res) => {
	let userID = req.params.userID;
	let removeUserQuery = `DELETE FROM users WHERE id=${userID}`;
	loginpageDb.query(removeUserQuery, (err, result) => {
		if (err) {
			console.log("you cant remove user!", err);
		} else {
			console.log("remove user succesfully:)");
			res.send(true);
		}
	});
});
userRoutes.put("/edit/:userID", (req, res) => {
	let userID = req.params.userID;
	let body = req.body;
	let upadateUserQuery = `UPDATE users SET firstname='${body.firstname}',lastname='${body.lastname}',email='${body.email}',password='${body.password}' WHERE id=${userID}`;
	loginpageDb.query(upadateUserQuery, (err, result) => {
		if (err) {
			console.log("you cant update user!", err);
		} else {
			console.log("update user succesfully:)");
			res.send(JSON.stringify(result));
		}
	});
});

module.exports = userRoutes;
