import httpStatus from "../utils/httpStatus";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { resultTypeOptionsService } from "../services";
import {
    ReqQueryResultTypeOptions,
    ReqGetResultTypeOptions,
    ReqCreateResultTypeOptions,
    ReqUpdateResultTypeOptions,
    ReqDeleteResultTypeOptions,
} from "../validations/resTypeOptions.validation";

const createResultTypeOptions = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateResultTypeOptions;
    const { data: resultTypeOptions } = validRequest.body;
    const resultTypeId = Number(validRequest.params.resultTypeId);

    const resultTypeOptionsCriados = await resultTypeOptionsService.createResultTypeOptions(
        resultTypeId,
        resultTypeOptions
    );
    res.status(httpStatus.CREATED).send(resultTypeOptionsCriados);
});

const queryResultTypeOptions = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryResultTypeOptions;

    const resultTypeOptions = await resultTypeOptionsService.queryResultTypeOptions(validRequest.query);
    res.send(resultTypeOptions);
});

const getResultTypeOptions = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqGetResultTypeOptions;

    const resultTypeOptions = await resultTypeOptionsService.getResultTypeOptionsById(Number(validRequest.params.id));
    res.send(resultTypeOptions);
});
const updateResultTypeOptions = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqUpdateResultTypeOptions;
    const resultTypeInfo = { id: Number(validRequest.params.id), ...validRequest.body.data };

    const updatedResultTypeOptions = await resultTypeOptionsService.updateResultTypeOptions(resultTypeInfo);
    res.send(updatedResultTypeOptions);
});

const deleteResultTypeOptions = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqDeleteResultTypeOptions;
    const { id } = validRequest.params;
    await resultTypeOptionsService.deleteResultTypeOptions(Number(id));
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createResultTypeOptions,
    queryResultTypeOptions,
    getResultTypeOptions,
    updateResultTypeOptions,
    deleteResultTypeOptions,
};
