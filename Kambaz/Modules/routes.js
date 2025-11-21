import ModulesDao from "./dao.js";

export default function ModulesRoutes(app) {
    const dao = ModulesDao();

    const findModulesForCourse = async (req, res) => {
        const { courseId } = req.params;
        const modules = await dao.findModulesForCourse(courseId);
        res.json(modules);
    };

    const createModuleForCourse = async (req, res) => {
        const { courseId } = req.params;
        const newModule = await dao.createModule(courseId, req.body);
        res.status(201).json(newModule);
    };

    const deleteModule = async (req, res) => {
        const { moduleId } = req.params;
        const status = await dao.deleteModule(moduleId);
        res.json(status);
    };

    const updateModule = async (req, res) => {
        const { moduleId } = req.params;
        const updated = await dao.updateModule(moduleId, req.body);
        res.json(updated);
    };

    const findModuleById = async (req, res) => {
        const { moduleId } = req.params;
        const module = await dao.findModuleById(moduleId);
        if (!module) return res.sendStatus(404);
        res.json(module);
    };

    app.get("/api/courses/:courseId/modules", findModulesForCourse);
    app.post("/api/courses/:courseId/modules", createModuleForCourse);
    app.get("/api/modules/:moduleId", findModuleById);
    app.put("/api/modules/:moduleId", updateModule);
    app.delete("/api/modules/:moduleId", deleteModule);
}