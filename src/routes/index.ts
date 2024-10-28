import express from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import patientRoute from "./patient.route";
import recordingRoute from "./recording.route";
import annotationTypeRoute from "./eventType.route";
import projectRoute from "./project.route";
import resultTypeRoute from "./resultType.route";
import resultTypeOpRoute from "./resTypeOptions.route";
const router = express.Router();

const defaultRoutes = [
    { path: "/users", route: userRoute },
    { path: "/auth", route: authRoute },
    { path: "/patient", route: patientRoute },
    { path: "/recording", route: recordingRoute },
    { path: "/annotation-type", route: annotationTypeRoute },
    { path: "/project", route: projectRoute },
    { path: "/result-type", route: resultTypeRoute },
    { path: "/result-type-options", route: resultTypeOpRoute },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
