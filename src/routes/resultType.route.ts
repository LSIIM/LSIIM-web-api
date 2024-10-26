import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import { resultTypeController } from "../controllers";
import resultTypeValidation from "../validations/resultType.validation";

const router = express.Router();

router
    .post("/", yupValidate(resultTypeValidation.createResultType), (req, res, next) => {
        try {
            resultTypeController.createResultType(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .get("/", yupValidate(resultTypeValidation.queryResultType), (req, res, next) => {
        try {
            resultTypeController.queryResultType(req, res, next);
        } catch (error) {
            next(error);
        }
    });

router.get("/:id", yupValidate(resultTypeValidation.getResultTypeById), (req, res, next) => {
    try {
        resultTypeController.getResultType(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default router;
