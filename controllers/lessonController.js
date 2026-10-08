const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const createLesson = async (req, res, next) => {
    try {
        const { title, videoUrl, duration } = req.body;
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        if (!title || !videoUrl || !duration) {
            return res.status(400).json({
                message: "Title, videoUrl and duration are required"
            });
        }

        const lesson = await Lesson.create({
            title,
            videoUrl,
            duration,
            course: courseId
        });

        res.status(201).json({
            message: "Lesson created successfully",
            lesson
        });
    } catch (error) {
        next(error);
    }
};

const getLessonsByCourse = async (req, res, next) => {
    try {
        const lessons = await Lesson.find({
            course: req.params.courseId
        }).sort({ createdAt: 1 });

        res.json({
            count: lessons.length,
            lessons
        });
    } catch (error) {
        next(error);
    }
};

const updateLesson = async (req, res, next) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        Object.assign(lesson, req.body);

        const updatedLesson = await lesson.save();

        res.json({
            message: "Lesson updated successfully",
            lesson: updatedLesson
        });
    } catch (error) {
        next(error);
    }
};

const deleteLesson = async (req, res, next) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        await lesson.deleteOne();

        res.json({
            message: "Lesson deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createLesson,
    getLessonsByCourse,
    updateLesson,
    deleteLesson
};