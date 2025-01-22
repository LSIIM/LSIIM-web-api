import httpStatus from "../utils/httpStatus";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { aeventTypeService as eventTypeService } from "../services";
import {
    ReqCreateEventType,
    ReqGetEventType,
    ReqQueryEventType,
    ReqUpdateEventType,
    ReqDeleteEventType,
} from "../validations/eventType.validation";

const createEventType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateEventType;
    const { data: eventType } = validRequest.body;

    const eventTypeCriado = await eventTypeService.createEventType(eventType);
    res.status(httpStatus.CREATED).send(eventTypeCriado);
});

const queryEventType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryEventType;
    const { query } = validRequest;
    const eventType = await eventTypeService.queryEventType(query);
    res.status(httpStatus.OK).send(eventType);
});

const getEventType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqGetEventType;
    const { id } = validRequest.params;
    const eventType = await eventTypeService.getEventType(id);
    res.status(httpStatus.OK).send(eventType);
});

const updateEventType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqUpdateEventType;
    const eventTypeInfos = { id: Number(validRequest.params.id), ...validRequest.body.data };

    const eventTypeAtualizado = await eventTypeService.updateEventType(eventTypeInfos);
    res.status(httpStatus.OK).send(eventTypeAtualizado);
});

const deleteEventType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqDeleteEventType;
    const { id } = validRequest.params;
    await eventTypeService.deleteEventType(id);
    res.status(httpStatus.NO_CONTENT).send();
})

export default {
    createEventType,
    queryEventType,
    getEventType,
    updateEventType,
    deleteEventType,
};
