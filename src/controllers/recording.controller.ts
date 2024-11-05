import httpStatus from "../utils/httpStatus";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { recordingService } from "../services";
import {
    ReqQueryRecording,
    ReqGetRecording,
    ReqCreateAnnotationAndResult,
    ReqCreateRecording,
    ReqQueryAnnotationVideo,
} from "../validations/recording.validation";

const createRecording = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateRecording;
    const { data: recording } = validRequest.body;
    const files = req.files as Express.Multer.File[];
    // Verifica se os arquivos foram recebidos
    if (!files || files.length === 0) {
        res.status(400).send('Nenhum arquivo foi enviado');
        return;
    }
    const recordingCriado = await recordingService.createRecording(recording, files);
    res.status(httpStatus.CREATED).send(recordingCriado);
});

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

const createAnnAndRes = catchAsync(async (req, res) => {
    const { recordingId } = req.params;
    const validRequest = req as unknown as ReqCreateAnnotationAndResult;
    const { data: annotationVideo } = validRequest.body;

    const annotations = await recordingService.createAnnotation(annotationVideo, Number(recordingId));
    res.status(httpStatus.CREATED).send(annotations);
});
const queryAnnotatioVideo = catchAsync(async (req, res) => {
    const { recordingId } = req.params;
    const validRequest = req as unknown as ReqQueryAnnotationVideo;

    const annotations = await recordingService.queryAnnotatioVideo(Number(recordingId), validRequest.query);
    res.send(annotations);
})

export default {
    createRecording,
    queryRecording,
    getRecording,
    createAnnAndRes,
    queryAnnotatioVideo
};
