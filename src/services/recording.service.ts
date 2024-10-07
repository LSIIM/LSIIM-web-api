import { Recording } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { PartialEntity, tNovoRecording } from "../types/response";