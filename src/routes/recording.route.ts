import express, { Request, Response, NextFunction } from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import recordingValidation, { ReqQueryRecording } from "../validations/recording.validation";
import { recordingController } from "../controllers";
import { fnSubjects } from "../config/subjects";
import upload from "../middlewares/upload";
const router = express.Router();
// Definição da rota para upload

router.route("/test").post(upload.array("videos"), (req, res, next) => {
    recordingController.createRecording(req, res, next);
})
router
    .route("/")
    .post(
        recordingController.reqInterceptorJson,
        yupValidate(recordingValidation.createRecording),
        (req, res, next) => {
            try {
                recordingController.createRecording(req, res, next);
            } catch (error) {
                next(error);
            }
        }
    )
    .get(yupValidate(recordingValidation.queryRecording), (req, res, next) => {
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
});
router
    .route("/:recordingId/annotation")
    .post(yupValidate(recordingValidation.createAnnAndRes), (req, res, next) => {
        try {
            recordingController.createAnnAndRes(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .get(yupValidate(recordingValidation.queryAnnotatioVideo), (req, res, next) => {
        try {
            recordingController.queryAnnotatioVideo(req, res, next);
        } catch (error) {
            next(error);
        }
    });

export default router;
