import httpStatus from "../utils/httpStatus";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { resultTypeOptionsService } from "../services";
import {
    ReqQueryResultTypeOptions,
    ReqGetResultTypeOptions,
    ReqCreateResultTypeOptions,
} from "../validations/resTypeOptions.validation";

const createResultTypeOptions = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateResultTypeOptions;
    const { data: resultTypeOptions } = validRequest.body;

    const resultTypeOptionsCriados = await resultTypeOptionsService.createResultTypeOptions(resultTypeOptions);
    res.status(httpStatus.CREATED).send(resultTypeOptionsCriados);
});

const queryResultTypeOptions = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryResultTypeOptions;

    const resultTypeOptions = await resultTypeOptionsService.queryResultTypeOptions(validRequest.query);
    res.send(resultTypeOptions);
});

const getResultTypeOptions = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqGetResultTypeOptions;

    const resultTypeOptions = await resultTypeOptionsService.getResultTypeOptionsById(validRequest.params.id);
    res.send(resultTypeOptions);
});

export default {
    createResultTypeOptions,
    queryResultTypeOptions,
    getResultTypeOptions,
};
