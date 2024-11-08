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
import { Request, Response, NextFunction } from "express";
import { run } from "node:test";
import { runPythonScript } from "../utils/pythonScript";

// Middleware para processar o corpo da requisição
const reqInterceptorMulter = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.recordings) throw new ApiError(httpStatus.BAD_REQUEST, "Nenhum recording enviado");

    req.body = JSON.parse(req.body.recordings);

    next();
};

const createRecording = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateRecording;
    const { data: recording } = validRequest.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
        res.status(400).json({ message: "Nenhum arquivo enviado" });
        return;
    }
    console.log(validRequest.body)
    await runPythonScript();
    
    
    // Extrai o nome dos arquivos para enviar ao service
    const fileNames = files.map((file) => file.filename);
    const recordingCriado = await recordingService.createRecording(recording, fileNames);
    res.status(httpStatus.CREATED).send(recordingCriado);
    return;
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
});

export default {
    createRecording,
    queryRecording,
    getRecording,
    createAnnAndRes,
    queryAnnotatioVideo,
    reqInterceptorJson: reqInterceptorMulter,
};
