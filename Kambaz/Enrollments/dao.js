import model from "./model.js";
export default function EnrollmentsDao(db) {
    async function findCoursesForUser(userId) {
        const enrollments = await model.find({ user: userId }).populate("course");
        return enrollments.map((enrollment) => enrollment.course);
    }
    async function findUsersForCourse(courseId) {
        const enrollments = await model.find({ course: courseId }).populate("user");
        return enrollments.map((enrollment) => enrollment.user);
    }

    async function enrollUserInCourse(userId, courseId) {
        const _id = `${userId}-${courseId}`;
        // Idempotent upsert: create if missing, otherwise do nothing
        return model.updateOne(
            { _id },
            { $setOnInsert: { _id, user: userId, course: courseId } },
            { upsert: true }
        );
    }

    function unenrollUserFromCourse(user, course) {
        return model.deleteOne({ user, course });
    }

    // New: remove all enrollments for a given course (used when deleting a course)
    function unenrollAllUsersFromCourse(courseId) {
        return model.deleteMany({ course: courseId });
    }

    // Optional: remove all enrollments for a given user (may be useful elsewhere)
    function unenrollAllCoursesForUser(userId) {
        return model.deleteMany({ user: userId });
    }

    function findEnrollmentsForUser(userId) {
        return model.find({ user: userId });
    }

    function findEnrollmentsForCourse(courseId) {
        return model.find({ course: courseId });
    }

    return {
        findCoursesForUser,
        findUsersForCourse,
        enrollUserInCourse,
        unenrollUserFromCourse,
        unenrollAllUsersFromCourse,
        unenrollAllCoursesForUser,
        findEnrollmentsForUser,
        findEnrollmentsForCourse,
    };
}
