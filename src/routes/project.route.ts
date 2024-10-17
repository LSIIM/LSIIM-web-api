import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import projectValidation, { ReqQueryProjectVideoType } from "../validations/project.validation";
import { projectController } from "../controllers";

const router = express.Router();
router.route("/").get(yupValidate(projectValidation.queryProject), (req, res, next) => {
    try {
        projectController.queryProject(req, res, next);
    } catch (error) {
        next(error);
    }
});
router.route("/:projectId/camtype").get(yupValidate(projectValidation.queryProjectVideoType), (req, res, next) => {
    try {
        projectController.queryProjectVideoType(req, res, next);
    } catch (error) {
        next(error);
    }
});
export default router;
