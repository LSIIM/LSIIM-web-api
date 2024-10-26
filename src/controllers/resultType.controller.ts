import httpStatus from '../utils/httpStatus';
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { resultTypeService } from "../services";
import { ReqQueryResultType, ReqGetResultType, ReqCreateResultType } from "../validations/resultType.validation";

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

    const resultType = await resultTypeService.getResultTypeById(validRequest.params.id);
    res.send(resultType);
});


export default {
    createResultType,
    queryResultType,
    getResultType,
};
