import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        _id: String,
        name: String,
        course: { type: String, ref: "CourseModel" },
        available: String,
        availableUntil: String,
        due: String,
        points: Number,
        // changed from single String to array
        module: [{ type: String, ref: "ModuleModel" }],
        description: String,
        displayGradeAs: String,
        submissionType: String,
        onlineEntryOptions: [String],
        assignTo: String
    },
    { collection: "assignments" }
);

export default assignmentSchema;