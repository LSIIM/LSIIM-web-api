import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import userValidation, { ReqCreateUser, ReqQueryUser } from "../validations/user.validation";
import { userController } from "../controllers";
import { fn } from "moment";
import { fnSubjects } from "../config/subjects";

const router = express.Router();

router
    .route("/")
    .post(auth('manageUsers'), yupValidate(userValidation.createUser), (req, res, next) => {
        try {
            const validRequest = req as unknown as ReqCreateUser;
            const arrParams = validRequest.body.data;

            userController.createUser(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .get( yupValidate(userValidation.queryUsers), (req, res, next) => {
        try {
            const validRequest = req as unknown as ReqQueryUser;
            const query = validRequest.query;
            fnSubjects("User", {...query});

            userController.queryUsers(req, res, next);
        } catch (error) {
            next(error);
        }
    });

export default router;
