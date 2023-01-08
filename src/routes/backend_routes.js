const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");

router.get("/", (req, res) => {
  res.json({ message: "ok"});
});

router.get("/test", auth, (req, res) => {
  res.json({ message: "ok", user_id: req.user_id});
});


// login
router.get("/login", async (req, res) => {
  console.log(req.query.code)
  if (!req.query.code) {
    res.json({ message: "no code" });
  }
  else {
    let access_token = await userService.getAccessToken(req.query.code);
    console.log(access_token)
    if (!access_token) {
      res.json({ message: "error" });
    }
    else {
      res.json({ message: "ok", access_token: access_token });
    }
  }
});

// ----------------- USER ------------------
const userService = require("../services/userService.js");
// get profile
// return: whole user object, including bolt count
router.get("/user/get-profile", auth, async (req, res) => {
  const user = await userService.getUserById(req.user_id);
  res.json(user);
});

// get n_bolt
// return: n_bolt of a user
router.get("/user/get-n-bolt", async (req, res) => {
  const user = await userService.getUserById(req.user_id);
  res.json(user.n_bolt);
});

// get my reviews
// return: array of reviews to render the /profile page
router.get("/user/get-my-reviews", async (req, res) => {});

// get waitlist status
// return: waitlist status (how many people front, how many syllabi upload needed, how many friends invite needed )
router.get("/user/get-waitlist-status", auth, async(req, res) => {
  const status = await userService.getWaitlistStatus(req.user_id);
  res.json(status);
});

// ----------------- COURSE -----------------

// get course
// return: course object, including reviews, syllabus, and aggregated results(faculties, ratings, etc.)
router.get("/course/get/:id", async (req, res) => {});

// ----------------- REVIEW -----------------

// submit the review
// return: error_code | review_id
router.post("/review/submit", async (req, res) => {});

// get specific review
// return: review object
router.get("/review/get/:id", async (req, res) => {});

// vote up/down a review
// return: error_code
router.post("/review/vote", async (req, res) => {});

// delete a review
// return: error_code
router.post("/review/delete", async (req, res) => {});

// update a review
// return: error_code
router.post("/review/update", async (req, res) => {});

// ----------------- SYLLABUS -----------------

// submit the syllabus
// return: error_code | syllabus_id
router.post("/syllabus/submit", async (req, res) => {});

// get syllabus
// return: syllabus object
router.get("/syllabus/get/:id", async (req, res) => {});

// update a syllabus
// return: error_code
router.post("/syllabus/update", async (req, res) => {});

// delete a syllabus
// return: error_code
router.post("/syllabus/delete", async (req, res) => {});

// ----------------- REDEEM -----------------

// redeem a bolt
// return: error_code
router.post("/redeem", async (req, res) => {});

// ----------------- STATS -----------------

// get total user count
// return: user count, confirmed user count, pending user count, disabled user count
router.get("/stats/get-user-count", async (req, res) => {});

// get total review count
// return: review count
router.get("/stats/get-review-count", async (req, res) => {});

// get total syllabus count
// return: syllabus count
router.get("/stats/get-syllabus-count", async (req, res) => {});

// get-course-stats
// return: course stats, like how many reviews, how many syllabus, sections, etc.
router.get("/stats/get-course-stats/:id", async (req, res) => {});

module.exports = router;
