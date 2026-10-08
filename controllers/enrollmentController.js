const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const enrollCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const existingEnrollment = await Enrollment.findOne({
            student: req.user._id,
            course: courseId
        });

        if (existingEnrollment) {
            return res.status(400).json({
                message: "Already enrolled in this course"
            });
        }

        const enrollment = await Enrollment.create({
            student: req.user._id,
            course: courseId
        });

        res.status(201).json({
            message: "Enrolled successfully",
            enrollment
        });
    } catch (error) {
        next(error);
    }
};

const getMyEnrollments = async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.user._id
        })
            .populate("course")
            .populate("completedLessons");

        res.json({
            count: enrollments.length,
            enrollments
        });
    } catch (error) {
        next(error);
    }
};

const updateProgress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { progress } = req.body;

        if (
            progress === undefined ||
            progress < 0 ||
            progress > 100
        ) {
            return res.status(400).json({
                message: "Progress must be between 0 and 100"
            });
        }

        const enrollment = await Enrollment.findOne({
            _id: id,
            student: req.user._id
        });

        if (!enrollment) {
            return res.status(404).json({
                message: "Enrollment not found"
            });
        }

        enrollment.progress = progress;

        await enrollment.save();

        res.json({
            message: "Progress updated successfully",
            enrollment
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    enrollCourse,
    getMyEnrollments,
    updateProgress
};