import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import annotationTypeValidation, { ReqCreateAnnotationType } from "../validations/annotationType.validation";
import { annotationTypeController } from "../controllers";

const router = express.Router();

router
    .route("/")
    .post(yupValidate(annotationTypeValidation.createAnnotationType), (req, res, next) => {
        try {
            // const validRequest = req as unknown as ReqCreateAnnotationType;
            // const arrParams = validRequest.body.data;

            annotationTypeController.createAnnotationType(req, res, next);
        } catch (error) {
            next(error);
        }
    });

export default router;