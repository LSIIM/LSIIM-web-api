import { Recording, AnnotationVideo, AnnotationResult, RecordingVideo } from "@prisma/client";
import httpStatus from "../utils/httpStatus";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { PartialEntity, tNovoAnnotationVideo, tNovoRecording, tNovoAnnotationResults } from "../types/response";
import config from "../config/config";
import fs from "fs";
import path from "path";

const createRecording = async (novoRecording: tNovoRecording[]): Promise<Recording[]> => {
    const createdRecordings = novoRecording.map((recording, index) => {
        //caminho para armazenar video
        const files: Express.Multer.File[] = []; // Initialize the files array
        const videos = files.map((file) => file.filename);
        return prisma.recording.create({
            data: {
                ...recording,
                recordingsVideos: {
                    create: recording.recordingsVideos.map((video) => ({
                        ...video,
                        file: videos,
                    })),
                },
            },
        });
    });

    const [...transaction] = await prisma.$transaction([...createdRecordings]);

    return transaction;
};

/**
 * Query for recordings
 * @param {Object} query - Opções de busca
 * @param {string} [query.sortBy] - Organiza pelo paramêtro passado
 * @param {string} [query.sortType] - Tipo de organização ("asc" => crescente, "desc" => decrescente)
 * @param {number} [query.limit] - Limite de dados por páginas a serem buscados (default = 10)
 * @param {number} [query.page] - Página atual (default = 0)
 * @param {Object} [query.where] - Opções de where para usar no prisma
 * @returns {Promise<QueryResult>}
 */
const queryRecording = async <Key extends keyof Recording>(
    query: {
        limit?: number;
        page?: number;
        sortBy?: Key;
        sortType?: "asc" | "desc";
        where?: { babyId?: number; projectId?: number; movId?: number };
    },
    keys: Key[] = [
        "id",
        "ignore",
        "observation",
        "patientId",
        "patient",
        "recordingDate",
        "moveId",
        "moveInfo",
        "projectId",
        "project",
        "recordingsVideos",
        "createdAt",
        "updatedAt",
    ] as Key[]
): Promise<(Pick<Recording, Key> & { videos: { url: string; is_main: string } }[])[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    //Busca informações do recording
    const recordings = await prisma.recording.findMany({
        where: query.where,
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    const getVideos = async (recordingId: number, projectId: number): Promise<{ url: string; isMain: boolean }[]> => {
        const basePath = "/videos";
        const pathToVideos = path.join(basePath, String(recordingId));
        try {
            //!Alterar o endsWith para .mp4 caso os vídeos sejam .mp4(no mac está como .avi)
            // Fazer o files arquivos que terminam com .avi ou .mp4
            const files = fs.readdirSync(pathToVideos).filter((file) => file.endsWith(".avi") || file.endsWith(".mp4"));
            const videos = await Promise.all(
                files.map(async (file) => {
                    const videoId = parseInt(file.split(".")[0], 10);

                    const projectVideoType = await prisma.projectVideoType.findUnique({
                        where: { id: videoId },
                        select: { isMain: true },
                    });

                    return {
                        url: `${config.URL_BASE_PATH ? config.URL_BASE_PATH.replace(/\/$/, "") : ""}/${pathToVideos.replace(/^\//, "")}/${file}`,
                        isMain: projectVideoType?.isMain ?? false,
                    };
                })
            );
            return videos;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const recordingsWithVideos = await Promise.all(
        recordings.map(async (recording) => ({
            ...recording,
            videos: await getVideos((recording as Recording).id, (recording as Recording).projectId),
        }))
    );
    return recordingsWithVideos as unknown as (Pick<Recording, Key> & { videos: { url: string; is_main: string } }[])[];
};

/**
 * Get recording info by id
 * @param {number} id
 */
const getRecordingById = async <Key extends keyof Recording>(
    id: number,
    keys: Key[] = [
        "id",
        "ignore",
        "observation",
        "patientId",
        "patient",
        "recordingDate",
        "moveId",
        "moveInfo",
        "projectId",
        "project",
        "recordingsVideos",
        "createdAt",
        "updatedAt",
    ] as Key[]
): Promise<Pick<Recording, Key> & { videos: { url: string; is_main: string } }[]> => {
    const recording = await prisma.recording.findUnique({
        where: { id: Number(id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    });
    if (!recording) throw new ApiError(httpStatus.NOT_FOUND, "Recording não encontrado.");

    const getVideos = async (id: number, projectId: number): Promise<{ url: string; isMain: boolean }[]> => {
        const pathBase = "/videos";
        const pathToRecordings = path.join(pathBase, String(id));
        try {
            const files = fs
                .readdirSync(pathToRecordings)
                .filter((file) => file.endsWith(".avi") || file.endsWith(".mp4"));
            const videos = await Promise.all(
                files.map(async (file) => {
                    const videoId = parseInt(file.split(".")[0], 10);

                    const projectVideoType = await prisma.projectVideoType.findUnique({
                        where: { id: videoId },
                        select: { isMain: true },
                    });

                    return {
                        url: `${process.env.URL_BASE_PATH ? process.env.URL_BASE_PATH.replace(/\/$/, "") : ""}/${pathBase.replace(/^\//, "")}/${id}/${file}`,
                        isMain: projectVideoType?.isMain ?? false,
                    };
                })
            );
            return videos;
        } catch (err) {
            console.log(err);
            return [];
        }
    };
    const recordingWithVideos = {
        ...recording,
        videos: await getVideos(id, (recording as Recording).projectId),
    };
    return recordingWithVideos as unknown as Pick<Recording, Key> & { videos: { url: string; is_main: string } }[];
};

const createAnnotation = async (
    annotationVideo: tNovoAnnotationVideo[],
    recordingId: number
): Promise<AnnotationVideo[]> => {
    const recordingParaAnotacao = await prisma.recordingVideo.findFirst({
        where: { recordingId: recordingId },
    });
    if (!recordingParaAnotacao) throw new ApiError(httpStatus.NOT_FOUND, "Recording não encontrado.");
    const annotationToCreate = annotationVideo.map((annotation) => ({
        ...annotation,
    }));

    //função para verificar se projectVideoType é main
    const isMain = async (projectVideoTypeId: number) => {
        const projectVideoType = await prisma.projectVideoType.findUnique({
            where: { id: projectVideoTypeId },
            select: { isMain: true },
        });
        return projectVideoType?.isMain ?? false;
    };
    if (!isMain) throw new ApiError(httpStatus.NOT_FOUND, "ProjectVideoType não é main.");

    const createdAnnotations = annotationToCreate.map(({ ...events }) => {
        events.events.forEach((annotationEvent) => {
            if (annotationEvent.frames.length < 1 || annotationEvent.frames.length > 2)
                throw new Error("Permitido 1 ou 2 frames.");
        });

        return prisma.annotationVideo.create({
            data: {
                ...events,
                events: {
                    create: events.events.map((annotationEvent) => ({
                        ...annotationEvent,
                    })),
                },
                results: {
                    create: (events.results ?? []).map((annotationResult) => ({
                        ...annotationResult,
                    })),
                },
            },
        });
    });

    const [...transaction] = await prisma.$transaction([...createdAnnotations]);

    return transaction as unknown as (AnnotationVideo & AnnotationResult)[];
};

const queryAnnotatioVideo = async <Key extends keyof AnnotationVideo>(
    recordingId: number,
    query: {
        limit?: number;
        page?: number;
        sortBy?: Key;
        sortType?: "asc" | "desc";
    },
    keys: Key[] = ["id", "recordingVideoId", "events", "results", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<AnnotationVideo, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";
    const recording = await getRecordingById(recordingId, ["id"]);
    if (!recording) throw new ApiError(httpStatus.NOT_FOUND, "Recording não encontrado.");

    const annotations = await prisma.recordingVideo.findMany({
        where: { recordingId: Number(recording.id) },
        select: { annotationVideos: { select: { events: true, results: true, recordingVideoId: true } } },
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return annotations as unknown as Pick<AnnotationVideo, Key>[];
};
export default {
    createRecording,
    queryRecording,
    getRecordingById,
    createAnnotation,
    queryAnnotatioVideo,
};
