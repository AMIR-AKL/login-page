const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.listen(3000, () => {
	console.log("listen port 3000");
});
app.use("/api/users", userRoutes);
