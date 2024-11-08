import { ErrorRequestHandler } from "express";
import ApiError from "../utils/apiError";
import { Prisma } from "@prisma/client";
import config from "../config/config";
import logger from "../config/logger";
import httpStatus from '../utils/httpStatus';

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
      console.log(error)
      const statusCode =
        error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError
          ? httpStatus.BAD_REQUEST
          : httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || "O servidor encontrou um estado com o qual não sabe lidar.";
      error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
  };

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus['INTERNAL_SERVER_ERROR'];
  }
  console.log(err)

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack })
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

