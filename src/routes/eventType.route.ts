import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import eventTypeValidation, { ReqCreateEventType } from "../validations/eventType.validation";
import { eventTypeController } from "../controllers";

const router = express.Router();

router
    .route("/")
    .post(yupValidate(eventTypeValidation.createEventType), (req, res, next) => {
        try {
            // const validRequest = req as unknown as ReqCreateAnnotationType;
            // const arrParams = validRequest.body.data;

            eventTypeController.createEventType(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .get(yupValidate(eventTypeValidation.queryEventType), (req, res, next) => {
        try {
            eventTypeController.queryEventType(req, res, next);
        } catch (error) {
            next(error);
        }
    });

router
    .route("/:id")
    .get(yupValidate(eventTypeValidation.getEventType), (req, res, next) => {
        try {
            eventTypeController.getEventType(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .patch(yupValidate(eventTypeValidation.updateEventType), (req, res, next) => {
        try {
            eventTypeController.updateEventType(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .delete(yupValidate(eventTypeValidation.deleteEventType), (req, res, next) => {
        try {
            eventTypeController.deleteEventType(req, res, next);
        } catch (error) {
            next(error);
        }
    });

export default router;
