const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    enrollCourse,
    getMyEnrollments,
    updateProgress
} = require("../controllers/enrollmentController");

router.post(
    "/:courseId",
    protect,
    enrollCourse
);

router.get(
    "/",
    protect,
    getMyEnrollments
);

router.put(
    "/:id/progress",
    protect,
    updateProgress
);

module.exports = router;