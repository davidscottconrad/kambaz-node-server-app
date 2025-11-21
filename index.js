import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import "dotenv/config";
import session from "express-session";
import mongoose from "mongoose";
const app = express();

if (process.env.SERVER_ENV !== "development") {
    app.set('trust proxy', 1);
}
const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

app.use(cors({
    origin: true,
    credentials: true,
}));

// Remove: app.options('*', cors());
// Generic preflight handler
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
        return res.sendStatus(204);
    }
    next();
});

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app, db);
Lab5(app);
Hello(app);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
app.listen(process.env.PORT || 4000);