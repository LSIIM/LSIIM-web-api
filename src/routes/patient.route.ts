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
            patientController.createPatient(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .get(yupValidate(babyValidation.queryPatient), (req, res, next) => {
        try {
            patientController.queryPatient(req, res, next);
        } catch (error) {
            next(error);
        }
    });

router
    .route("/:id")
    .get(yupValidate(babyValidation.getPatient), (req, res, next) => {
        try {
            patientController.getPatient(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .patch(yupValidate(babyValidation.updatePatient), (req, res, next) => {
        try {
            patientController.updatePatient(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .delete(yupValidate(babyValidation.deletePatient), (req, res, next) => {
        try {
            patientController.deletePatient(req, res, next);
        } catch (error) {
            next(error);
        }
    });

export default router;
