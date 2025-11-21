import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js"; // adjust path if different

export default function CoursesDao() {
    function findAllCourses() {
        return model.find();
    }

    // findCoursesForEnrolledUser with populate
    async function findCoursesForEnrolledUser(userId) {
        const enrollments = await enrollmentModel.find({ user: userId }).populate("course");
        return enrollments.map(e => e.course);
    }

    function createCourse(course) {
        return model.create(course);
    }

    async function deleteCourse(courseId) {
        return model.deleteOne({ _id: courseId });
    }

    function updateCourse(courseId, courseUpdates) {
        return model.findByIdAndUpdate(courseId, courseUpdates, { new: true });
    }
    function unenrollAllUsersFromCourse(courseId) {
        return model.deleteMany({ course: courseId });
    }

    return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse, unenrollAllUsersFromCourse };
}
