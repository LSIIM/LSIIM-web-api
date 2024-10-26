import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import babyValidation, { ReqCreatePatient, ReqGetPatient, ReqQueryPatient } from "../validations/patient.validation";
import { patientController } from "../controllers";

const router = express.Router();

router
    .route("/")
    .post(yupValidate(babyValidation.createPatient), (req, res, next) => {
        try {
            // const validRequest = req as unknown as ReqCreateBabyInfo;
            // const arrParams = validRequest.body.data;

            patientController.createPatient(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .get(yupValidate(babyValidation.queryPatient), (req, res, next) => {
        try {
            const validRequest = req as unknown as ReqQueryPatient;
            const params = validRequest.query.where;

            patientController.queryPatient(req, res, next);
        } catch (error) {
            next(error);
        }
    });

router.route("/:id").get(yupValidate(babyValidation.getPatient), (req, res, next) => {
    try {
        // const validRequest = req as unknown as ReqGetBabyInfo;
        // const params = validRequest.params;

        patientController.getPatient(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default router;
