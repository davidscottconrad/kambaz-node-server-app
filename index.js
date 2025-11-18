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
const app = express();
app.use(
    cors({
        credentials: true,
        origin: function (origin, callback) {
            // Allow requests with no origin (mobile apps, Postman, etc.)
            if (!origin) return callback(null, true);

            // Allow localhost for development
            if (origin.includes('localhost')) return callback(null, true);

            // Allow main production URL from env variable
            if (origin === process.env.CLIENT_URL) return callback(null, true);

            // Allow all Vercel preview deployments
            if (origin.match(/^https:\/\/kambaz-next-js-david-conrad.*\.vercel\.app$/)) {
                return callback(null, true);
            }

            callback(new Error('Not allowed by CORS'));
        }
    })
);
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