import express from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import babyRoute from "./baby.route";
import recordingRoute from "./recording.route";
import annotationTypeRoute from "./annotationType.route";
const router = express.Router();

const defaultRoutes = [
    { path: "/users", route: userRoute },
    { path: "/auth", route: authRoute },
    { path: "/baby", route: babyRoute },
    { path: "/recording", route: recordingRoute },
    { path: "/annotation-type", route: annotationTypeRoute },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
