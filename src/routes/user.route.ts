import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import userValidation, { ReqCreateUser, ReqQueryUser } from "../validations/user.validation";
import { userController } from "../controllers";

const router = express.Router();

router
    .route("/")
    .post(yupValidate(userValidation.createUser), (req, res, next) => {
        try {
            const validRequest = req as unknown as ReqCreateUser;
            const arrParams = validRequest.body.data;

            userController.createUser(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .get(yupValidate(userValidation.queryUsers), (req, res, next) => {
        try {
            const validRequest = req as unknown as ReqQueryUser;
            const query = validRequest.query;

            userController.queryUsers(req, res, next);
        } catch (error) {
            next(error);
        }
    });

export default router;
