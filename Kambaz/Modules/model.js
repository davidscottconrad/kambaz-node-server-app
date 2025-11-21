import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
    {
        _id: String,
        name: String,
        description: String,
    },
    { _id: false } // keep provided _id, prevent auto ObjectId
);

const moduleSchema = new mongoose.Schema(
    {
        _id: String,
        name: String,
        description: String,
        course: { type: String, ref: "CourseModel" }, // optional if relating to Course
        lessons: [lessonSchema],
    },
    { collection: "modules" }
);

const ModuleModel = mongoose.model("ModuleModel", moduleSchema);
export default ModuleModel;