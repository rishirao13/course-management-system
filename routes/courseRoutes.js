const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");


// GET ALL COURSES
router.get("/", getCourses);


// GET SINGLE COURSE
router.get("/:id", getCourseById);


// CREATE COURSE - ADMIN ONLY
router.post(
    "/",
    protect,
    authorize("admin"),
    createCourse
);


// UPDATE COURSE - ADMIN ONLY
router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateCourse
);


// DELETE COURSE - ADMIN ONLY
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteCourse
);


module.exports = router;