import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import httpStatus from './utils/httpStatus';
import passport from "passport";
import routes from "./routes";
import { jwtStrategy } from "./config/passport";
import ApiError from "./utils/apiError";
import { errorConverter, errorHandler } from "./middlewares/error";
import { reqInterceptor } from "./middlewares/reqInterceptor";

dotenv.config();
const server = express();
// set security HTTP headers
server.use(helmet());

//gzip compression
server.use(compression());

// parse json request body
server.use(express.json());

// enable cors
server.use(cors());
server.options("*", cors());

// jwt authentication
server.use(passport.initialize());
passport.use("jwt", jwtStrategy);

//Lida com as querys
server.use(reqInterceptor);
//v1 api routes
server.use("/v1", routes);

server.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
})

//send back a 404 error for any unknown api request
// convert error to ApiError, if needed
server.use(errorConverter);

// handle error
server.use(errorHandler);



export default server;