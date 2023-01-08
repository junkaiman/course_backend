const path = require("path");
const express = require("express");
const router = express.Router();

// Register frontend to the route
const frontend_path = path.join(__dirname, "../../../course_frontend/dist");
router.use("/", express.static(frontend_path, { redirect: true }));
router.use("/*", express.static(frontend_path, { redirect: true }));

module.exports = router;
