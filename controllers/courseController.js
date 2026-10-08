const Course = require("../models/Course");

// CREATE COURSE
const createCourse = async (req, res, next) => {
    try {
        const {
            title,
            description,
            instructor,
            price,
            category,
            duration
        } = req.body;

        if (
            !title ||
            !description ||
            !instructor ||
            price === undefined ||
            !category ||
            !duration
        ) {
            return res.status(400).json({
                message: "All course fields are required"
            });
        }

        const course = await Course.create({
            title,
            description,
            instructor,
            price,
            category,
            duration,
            createdBy: req.user._id
        });

        res.status(201).json({
            message: "Course created successfully",
            course
        });
    } catch (error) {
        next(error);
    }
};


// GET ALL COURSES
const getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.json({
            count: courses.length,
            courses
        });
    } catch (error) {
        next(error);
    }
};


// GET SINGLE COURSE
const getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.json(course);
    } catch (error) {
        next(error);
    }
};


// UPDATE COURSE
const updateCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        Object.assign(course, req.body);

        const updatedCourse = await course.save();

        res.json({
            message: "Course updated successfully",
            course: updatedCourse
        });
    } catch (error) {
        next(error);
    }
};


// DELETE COURSE
const deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        await course.deleteOne();

        res.json({
            message: "Course deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};


// EXPORT
module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};