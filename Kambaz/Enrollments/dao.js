export default function EnrollmentsDao(db) {
    function enrollUserInCourse(userId, courseId) {
        console.log("Enrolling user in course:", userId, courseId);
        const { enrollments } = db;
        const existingEnrollment = enrollments.find(
            (enrollment) => enrollment.user === userId && enrollment.course === courseId
        );
        if (!existingEnrollment) {
            db.enrollments = [...enrollments, { _id: Date.now().toString(), user: userId, course: courseId }];
        }
    }

    function unenrollUserFromCourse(userId, courseId) {
        console.log("Unenrolling user from course:", userId, courseId);
        const { enrollments } = db;
        db.enrollments = enrollments.filter(
            (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
        );
    }

    function findEnrollmentsForUser(userId) {
        console.log("Finding enrollments for user:", userId);
        const { enrollments } = db;
        return enrollments.filter((enrollment) => enrollment.user === userId);
    }

    function findEnrollmentsForCourse(courseId) {
        const { enrollments } = db;
        return enrollments.filter((enrollment) => enrollment.course === courseId);
    }

    return {
        enrollUserInCourse,
        unenrollUserFromCourse,
        findEnrollmentsForUser,
        findEnrollmentsForCourse,
    };
}