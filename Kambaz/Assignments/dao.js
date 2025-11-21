import { v4 as uuidv4 } from "uuid";
import AssignmentModel from "./model.js";

export default function AssignmentsDao() {
    async function findAssignmentsForCourse(courseId) {
        return AssignmentModel.find({ course: courseId }).lean();
    }

    async function findAssignmentById(assignmentId) {
        return AssignmentModel.findById(assignmentId).lean();
    }

    async function createAssignment(courseId, assignment) {
        const doc = new AssignmentModel({
            ...assignment,
            _id: uuidv4(),
            course: courseId
        });
        return doc.save();
    }

    async function deleteAssignment(assignmentId) {
        return AssignmentModel.deleteOne({ _id: assignmentId });
    }

    async function updateAssignment(assignmentId, assignmentUpdates) {
        await AssignmentModel.updateOne(
            { _id: assignmentId },
            { $set: assignmentUpdates }
        );
        return AssignmentModel.findById(assignmentId).lean();
    }

    return {
        findAssignmentsForCourse,
        findAssignmentById,
        createAssignment,
        deleteAssignment,
        updateAssignment
    };
}