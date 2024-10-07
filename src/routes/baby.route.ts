import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import babyValidation, { ReqCreateBabyInfo, ReqQueryBabyInfo, ReqGetBabyInfo } from "../validations/baby.validation";
import { babyController } from "../controllers";

const router = express.Router();

router
    .route("/")
    .post(yupValidate(babyValidation.createBabyInfo), (req, res, next) => {
        try {
            // const validRequest = req as unknown as ReqCreateBabyInfo;
            // const arrParams = validRequest.body.data;

            babyController.createBabyInfo(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .get(yupValidate(babyValidation.queryBabyInfo), (req, res, next) => {
        try {
            const validRequest = req as unknown as ReqQueryBabyInfo;
            const params = validRequest.query.where;

            babyController.queryBabyInfo(req, res, next);
        } catch (error) {
            next(error);
        }
    });

router.route("/:id").get(yupValidate(babyValidation.getBabyInfo), (req, res, next) => {
    try {
        // const validRequest = req as unknown as ReqGetBabyInfo;
        // const params = validRequest.params;

        babyController.getBabyInfoById(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default router;
