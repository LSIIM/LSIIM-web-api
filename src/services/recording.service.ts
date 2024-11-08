import { Recording, AnnotationVideo, AnnotationResult, RecordingVideo } from "@prisma/client";
import httpStatus from "../utils/httpStatus";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { PartialEntity, tNovoAnnotationVideo, tNovoRecording, tNovoAnnotationResults } from "../types/response";
import path from "path";
import fs from "fs";
import config from "../config/config";
import { runPythonScript } from "../utils/pythonScript";
const createRecording = async (novoRecording: tNovoRecording[], files: string[]): Promise<Recording[]> => {
    const urlPath = config.URL_BASE_PATH;
    // Cria a pasta temporária para armazenar os vídeos
    const tempFolderPath = path.join(__dirname, "/videos", "temp");
    if (!fs.existsSync(tempFolderPath)) {
        fs.mkdirSync(tempFolderPath, { recursive: true });
    }

    // Concatena os nomes dos arquivos
    const fileName = files.join(", ");
    const recordingToCreate = novoRecording.map((recording) => {
        return prisma.recording.create({
            data: {
                ...recording,
                recordingsVideos: {
                    create: recording.recordingsVideos.map((video) => ({
                        ...video,
                        file: fileName,
                    })),
                },
            },
        });
    });
    // Executa a transação e cria o recording no banco
    const recordingCriado = await prisma.$transaction([...recordingToCreate]);

    // Renomeia a pasta temporária para o ID do novo recording
    const newFolderPath = path.join(__dirname, "/videos", `${recordingCriado[0].id}`);
    if (!fs.existsSync(newFolderPath)) {
        fs.mkdirSync(newFolderPath, { recursive: true });
    }

    // Move os arquivos da pasta temporária para a nova pasta
    files.forEach((file) => {
        const tempFilePath = path.join(tempFolderPath, file);
        const newFilePath = path.join(newFolderPath, file);

        fs.renameSync(tempFilePath, newFilePath);
    });

    await runPythonScript();

    if (fs.readdirSync(tempFolderPath).length >= 0) {
        fs.rmSync(tempFolderPath, { recursive: true });
    }
    return recordingCriado;
};

/**
 * Fetch videos associated with a recording
 * @param {number} recordingId - ID do recording
 * @returns {Promise<{id: number, projectVideoTypeId: number, camIdUsed: number, url: string, isMain: boolean}[]>}
 */
const getVideos = async (recordingId: number): Promise<RecordingVideo[]> => {
    const pathBase = "/videos";

    try {
        // Busca os vídeos relacionados ao recording no banco de dados
        const recordingVideos = await prisma.recordingVideo.findMany({
            where: { recordingId },
            select: {
                id: true,
                projectVideoTypeId: true,
                camIdUsed: true,
                projectVideoType: { select: { isMain: true } },
            },
        });

        // Mapeia cada vídeo para construir a URL e incluir a informação de `isMain`
        const videos = recordingVideos.map((video) => ({
            ...video,
            url: `${process.env.URL_BASE_PATH ? process.env.URL_BASE_PATH.replace(/\/$/, "") : ""}/${pathBase.replace(/^\//, "")}/${recordingId}/${video.projectVideoTypeId}.mp4`,
        }));

        return videos as unknown as RecordingVideo[];
    } catch (err) {
        console.log(err);
        return [];
    }
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
): Promise<
    (Pick<Recording, Key> & {
        recordingsVideos: { id: number; projectVideoTypeId: number; camIdUsed: number; url: string; isMain: boolean }[];
    })[]
> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    const recordings = (await prisma.recording.findMany({
        where: query.where,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    })) as Recording[];

    const recordingsWithVideos = await Promise.all(
        recordings.map(async (recording) => ({
            ...recording,
            recordingsVideos: await getVideos(recording.id as number),
        }))
    );

    return recordingsWithVideos as unknown as (Pick<Recording, Key> & {
        recordingsVideos: { id: number; projectVideoTypeId: number; camIdUsed: number; url: string; isMain: boolean }[];
    })[];
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
): Promise<
    Pick<Recording, Key> & {
        recordingsVideos: { id: number; projectVideoTypeId: number; camIdUsed: number; url: string; isMain: boolean }[];
    }
> => {
    const recording = await prisma.recording.findUnique({
        where: { id: Number(id) },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    });
    if (!recording) throw new ApiError(httpStatus.NOT_FOUND, "Recording não encontrado.");

    const recordingWithVideos = {
        ...recording,
        recordingsVideos: await getVideos(Number(id)),
    };

    return recordingWithVideos as unknown as Pick<Recording, Key> & {
        recordingsVideos: { id: number; projectVideoTypeId: number; camIdUsed: number; url: string; isMain: boolean }[];
    };
};

const createAnnotation = async (
    annotationVideo: tNovoAnnotationVideo[],
    recordingId: number
): Promise<AnnotationVideo[]> => {
    const recordingParaAnotacao = await prisma.recordingVideo.findFirst({
        where: { recordingId: recordingId },
        select: { annotationVideos: true },
    });
    if (!recordingParaAnotacao) throw new ApiError(httpStatus.NOT_FOUND, "Recording não encontrado.");
    const annotationToCreate = annotationVideo.map((annotation) => ({
        ...annotation,
    }));
    //TODO: AJEITAR A DELEÇÕES DA ANOTACAO
    //verificar se existe anotacao para o recordingId passado
    if (recordingParaAnotacao.annotationVideos.length > 0){
        const _deleteEvents = await prisma.annotationEvent.deleteMany({
            where: { annotationVideoId: recordingParaAnotacao.annotationVideos[0].id },
        });
        const _deleteResults = await prisma.annotationResult.deleteMany({
            where: { annotationVideoId: recordingParaAnotacao.annotationVideos[0].id },
        });
        const _deleteAnnotation = await prisma.annotationVideo.delete({
            where: { id: recordingParaAnotacao.annotationVideos[0].id },
        });
    };

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
    keys: Key[] = ["id", "recordingVideoId", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<AnnotationVideo, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";
    const recording = await getRecordingById(recordingId, ["id"]);
    if (!recording) throw new ApiError(httpStatus.NOT_FOUND, "Recording não encontrado.");

    const annotations = await prisma.recordingVideo.findFirst({
        where: { recordingId: Number(recording.id) },
        select: {
            recordingId: true,
            annotationVideos: {
                select: {
                    events: { include: { eventType: { select: { name: true } } } },
                    results: true,
                    recordingVideoId: true,
                },
            },
        },
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
