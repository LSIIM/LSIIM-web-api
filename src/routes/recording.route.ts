import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import recordingValidation, { ReqQueryRecording } from "../validations/recording.validation";
import { recordingController } from "../controllers";
import { fnSubjects } from "../config/subjects";
const router = express.Router();

router.route("/").get(yupValidate(recordingValidation.queryRecording), (req, res, next) => {
    try {
        const validRequest = req as unknown as ReqQueryRecording;
        const params = validRequest.query.where;

        fnSubjects("Recording", { ...params });

        recordingController.queryRecording(req, res, next);
    } catch (error) {
        next(error);
    }
});
router.route("/:id").get(yupValidate(recordingValidation.getRecording), (req, res, next) => {
    try {
        recordingController.getRecording(req, res, next);
    } catch (error) {
        next(error);
    }
}
);
router.route("/:recordingId/annotation").post(yupValidate(recordingValidation.createAnnotation), (req, res, next) => {
    try {
        recordingController.createAnnotation(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default router;
