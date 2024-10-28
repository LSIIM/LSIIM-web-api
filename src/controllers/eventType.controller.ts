import httpStatus from "../utils/httpStatus";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { aeventTypeService } from "../services";
import { ReqCreateEventType, ReqGetEventType, ReqQueryEventType } from "../validations/eventType.validation";

const createEventType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateEventType;
    const { data: eventType } = validRequest.body;

    const eventTypeCriado = await aeventTypeService.createEventType(eventType);
    res.status(httpStatus.CREATED).send(eventTypeCriado);
});

const queryEventType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryEventType;
    const { query } = validRequest;
    const eventType = await aeventTypeService.queryEventType(query);
    res.status(httpStatus.OK).send(eventType);
});

const getEventType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqGetEventType;
    const { id } = validRequest.params;
    const eventType = await aeventTypeService.getEventType(id);
    res.status(httpStatus.OK).send(eventType);
});

export default {
    createEventType,
    queryEventType,
    getEventType,
};
