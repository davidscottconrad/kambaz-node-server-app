import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
    const dao = AssignmentsDao();

    const findAssignmentsForCourse = async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    };

    const findAssignmentById = async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await dao.findAssignmentById(assignmentId);
        if (!assignment) return res.sendStatus(404);
        res.json(assignment);
    };

    const createAssignmentForCourse = async (req, res) => {
        const { courseId } = req.params;
        const newAssignment = await dao.createAssignment(courseId, req.body);
        res.status(201).json(newAssignment);
    };

    const deleteAssignment = async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.json(status);
    };

    const updateAssignment = async (req, res) => {
        const { assignmentId } = req.params;
        const updated = await dao.updateAssignment(assignmentId, req.body);
        if (!updated) return res.sendStatus(404);
        res.json(updated);
    };

    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.get("/api/assignments/:assignmentId", findAssignmentById);
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
    app.put("/api/assignments/:assignmentId", updateAssignment);
}