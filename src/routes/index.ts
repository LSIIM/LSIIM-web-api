import express from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import babyRoute from "./baby.route";
const router = express.Router();

const defaultRoutes = [
    { path: "/users", route: userRoute },
    { path: "/auth", route: authRoute },
    {path: "/baby-infos", route: babyRoute}
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
