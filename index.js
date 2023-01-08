const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db_conf = require("./src/configs/db_conf.js");

// DB connection
mongoose.connect(db_conf.url);
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Error connecting to DB", err);
});

db.once("connected", () => {
  console.log("DB connected");
});

// App hosting
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const backend_routes = require("./src/routes/backend_routes.js");
const frontend_routes = require("./src/routes/frontend_routes.js");
app.use("/api", backend_routes);
app.use("/", frontend_routes);

// App listening
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`App listening at http://localhost:${port}`);
});
