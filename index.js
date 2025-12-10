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

// trust proxy only in production
// if (process.env.NODE_ENV !== "development") {
app.set('trust proxy', 1);
// }

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL || "http://localhost:3000",
    })
);

const isProduction = process.env.NODE_ENV === "production";
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};

if (process.env.SERVER_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
    };
}


app.use(session(sessionOptions));

// JSON parser after session
app.use(express.json());

// Optional: debug
app.get("/api/session-test", (req, res) => {
    req.session.count = (req.session.count || 0) + 1;
    res.json({ id: req.sessionID, hasUser: !!req.session.currentUser, count: req.session.count });
});

UserRoutes(app, db);
Lab5(app);
Hello(app);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
app.listen(process.env.PORT || 4000);