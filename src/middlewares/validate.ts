import httpStatus from '../utils/httpStatus'
import ApiError from "../utils/apiError";
import { NextFunction, Request, Response } from "express";
import pick from "../utils/pick";
import * as yup from "yup";

export const yupValidate = (schema: yup.AnySchema) => async (req: Request, _: Response, next: NextFunction) => {
    try {
        //Filtrando somente params, query e body da requisição
        const object: any = pick(req, ["body", "params", "query"]);
        await schema.validate(object, { abortEarly: false, stripUnknown: true });
        return next();
    } catch (err: any) {
        console.error(err);
        return next(
            new ApiError(
                httpStatus.BAD_REQUEST,
                err.errors[0] ?? "Houve um erro desconhecido ao validar sua requisição."
            )
        );
    }
};