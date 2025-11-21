import { v4 as uuidv4 } from "uuid";
import ModuleModel from "./model.js";

export default function ModulesDao() {
    async function findModulesForCourse(courseId) {
        return ModuleModel.find({ course: courseId }).lean();
    }

    async function createModule(courseId, module) {
        const doc = new ModuleModel({
            ...module,
            _id: uuidv4(),
            course: courseId
        });
        return doc.save();
    }

    async function deleteModule(moduleId) {
        return ModuleModel.deleteOne({ _id: moduleId });
    }

    async function updateModule(moduleId, moduleUpdates) {
        await ModuleModel.updateOne(
            { _id: moduleId },
            { $set: moduleUpdates }
        );
        return ModuleModel.findById(moduleId).lean();
    }

    async function findModuleById(moduleId) {
        return ModuleModel.findById(moduleId).lean();
    }

    return {
        findModulesForCourse,
        createModule,
        deleteModule,
        updateModule,
        findModuleById
    };
}