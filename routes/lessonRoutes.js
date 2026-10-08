const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    createLesson,
    getLessonsByCourse,
    updateLesson,
    deleteLesson
} = require("../controllers/lessonController");

router.post(
    "/course/:courseId",
    protect,
    authorize("admin"),
    createLesson
);

router.get(
    "/course/:courseId",
    protect,
    getLessonsByCourse
);

router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateLesson
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteLesson
);

module.exports = router;