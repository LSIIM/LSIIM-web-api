import httpStatus from "../utils/httpStatus";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { resultTypeService } from "../services";
import {
    ReqQueryResultType,
    ReqGetResultType,
    ReqCreateResultType,
    ReqUpdateResultType,
    ReqDeleteResultType,
} from "../validations/resultType.validation";

const createResultType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateResultType;
    const { data: resultType } = validRequest.body;

    const resultTypeCriado = await resultTypeService.createResultType(resultType);
    res.status(httpStatus.CREATED).send(resultTypeCriado);
});

const queryResultType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryResultType;

    const resultTypes = await resultTypeService.queryResultType(validRequest.query);
    res.send(resultTypes);
});

const getResultType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqGetResultType;
    const {id} = validRequest.params
    const resultType = await resultTypeService.getResultTypeById(Number(id));
    res.send(resultType);
});

const updateResultType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqUpdateResultType;
    const eventTypeInfos = { id: Number(validRequest.params.id), ...validRequest.body.data };

    const resultTypeAtualizado = await resultTypeService.updateResultType(eventTypeInfos);
    res.status(httpStatus.OK).send(resultTypeAtualizado);
});

const deleteResultType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqDeleteResultType;
    const { id } = validRequest.params;
    await resultTypeService.deleteResultType(Number(id));
    res.status(httpStatus.NO_CONTENT).send();
});
export default {
    createResultType,
    queryResultType,
    getResultType,
    updateResultType,
    deleteResultType,
};
