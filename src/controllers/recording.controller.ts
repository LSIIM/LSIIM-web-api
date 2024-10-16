import httpStatus from "http-status";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { recordingService } from "../services";
import { ReqQueryRecording, ReqGetRecording, ReqCreateAnnotation } from "../validations/recording.validation";

const queryRecording = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryRecording;

    const recordings = await recordingService.queryRecording(validRequest.query);
    res.send(recordings);
});
const getRecording = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqGetRecording;

    const recording = await recordingService.getRecordingById(validRequest.params.id);
    res.send(recording);
});

const createAnnotation = catchAsync(async (req, res) => {
    const { recordingId } = req.params
    const validRequest = req as unknown as ReqCreateAnnotation;

    const annotations = await recordingService.createAnnotation(validRequest.body.data, Number(recordingId));
    res.status(httpStatus.CREATED).send(annotations);
});

export default {
    queryRecording,
    getRecording,
    createAnnotation,
};
