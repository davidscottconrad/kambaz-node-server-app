import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);

    const enrollUserInCourse = async (req, res) => {
        try {
            let { userId, courseId } = req.params;
            if (userId === "current") {
                const currentUser = req.session["currentUser"];
                if (!currentUser) {
                    res.sendStatus(401);
                    return;
                }
                userId = currentUser._id;
            }
            const result = await dao.enrollUserInCourse(userId, courseId);
            const created = result.upsertedCount === 1 || result.upsertedId != null;
            res.sendStatus(created ? 201 : 200);
        } catch (e) {
            console.error("Enroll error:", e);
            res.sendStatus(500);
        }
    };

    const unenrollUserFromCourse = async (req, res) => {
        try {
            let { userId, courseId } = req.params;
            if (userId === "current") {
                const currentUser = req.session["currentUser"];
                if (!currentUser) {
                    res.sendStatus(401);
                    return;
                }
                userId = currentUser._id;
            }
            await dao.unenrollUserFromCourse(userId, courseId);
            res.sendStatus(200);
        } catch (e) {
            console.error("Unenroll error:", e);
            res.sendStatus(500);
        }
    };

    const findEnrollmentsForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const enrollments = await dao.findEnrollmentsForCourse(courseId);
            res.json(enrollments);
        } catch (e) {
            console.error("Find enrollments for course error:", e);
            res.sendStatus(500);
        }
    };

    const findEnrollmentsForUser = async (req, res) => {
        try {
            let { userId } = req.params;
            if (userId === "current") {
                const currentUser = req.session["currentUser"];
                if (!currentUser) {
                    res.sendStatus(401);
                    return;
                }
                userId = currentUser._id;
            }
            const enrollments = await dao.findEnrollmentsForUser(userId);
            res.json(enrollments);
        } catch (e) {
            console.error("Find enrollments for user error:", e);
            res.sendStatus(500);
        }
    };

    app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
    app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
    app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
    app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
}