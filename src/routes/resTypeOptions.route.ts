import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import { resultTypeOptionsController } from "../controllers";
import resTypeOptionsValidation from "../validations/resTypeOptions.validation";

const router = express.Router();
router.route("/:resultTypeId").post(yupValidate(resTypeOptionsValidation.createResultTypeOptions), (req, res, next) => {
    try {
        resultTypeOptionsController.createResultTypeOptions(req, res, next);
    } catch (error) {
        next(error);
    }
});
router.get("/", yupValidate(resTypeOptionsValidation.queryResultTypeOptions), (req, res, next) => {
    try {
        resultTypeOptionsController.queryResultTypeOptions(req, res, next);
    } catch (error) {
        next(error);
    }
});

router
    .route("/:id")
    .get(yupValidate(resTypeOptionsValidation.getResultTypeOptionsById), (req, res, next) => {
        try {
            resultTypeOptionsController.getResultTypeOptions(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .patch(yupValidate(resTypeOptionsValidation.updateResultTypeOptions), (req, res, next) => {
        try {
            resultTypeOptionsController.updateResultTypeOptions(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .delete(yupValidate(resTypeOptionsValidation.deleteResultTypeOptions), (req, res, next) => {
        try {
            resultTypeOptionsController.deleteResultTypeOptions(req, res, next);
        } catch (error) {
            next(error);
        }
    });

export default router;
