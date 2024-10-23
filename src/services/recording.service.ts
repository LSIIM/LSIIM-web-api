import { Recording, Annotation } from "@prisma/client";
import httpStatus from '../utils/httpStatus';
import prisma from "../client";
import ApiError from "../utils/apiError";
import { PartialEntity, tNovoAnnotation, tNovoRecording } from "../types/response";
import config from "../config/config";
import fs from "fs";
import path from "path";
const createRecording = async (novoRecording: tNovoRecording[]): Promise<Recording[]> => {
    const _createRecording = prisma.recording.createManyAndReturn({
        data: novoRecording,
    });

    const [recordingCriados] = await prisma.$transaction([_createRecording]);
    return recordingCriados;
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
        "babyId",
        "babyInfo",
        "recordingDate",
        "moveId",
        "moveInfo",
        "movAux",
        "projectId",
        "project",
        "camInfoId",
        "camInfo",
        "recordVideoTypes",
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
        const basePath = '/videos';
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
                        url: path.join(pathToVideos, file),
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
        "babyId",
        "recordingDate",
        "moveId",
        "movAux",
        "projectId",
        "project",
        "recordVideoTypes",
        "createdAt",
        "updatedAt",
    ] as Key[]
): Promise<Pick<Recording, Key> | null> => {
    const recording = await prisma.recording.findUnique({
        where: { id: Number(id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    });

    const getVideos = async (recordingId: number, projectId: number): Promise<{ url: string; isMain: boolean }[]> => {
        const basePath = '/videos';
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
                        url: path.join(pathToVideos, file),
                        isMain: projectVideoType?.isMain ?? false,
                    };
                })
            );
            return videos;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    const recordingWithVideos = {
        ...recording,
        videos: await getVideos((recording as Recording).id, (recording as Recording).projectId),
    }
    return recordingWithVideos as unknown as Promise<Pick<Recording, Key> | null>;
};

const createAnnotation = async (annotations: tNovoAnnotation[], recordingId: number): Promise<Annotation[]> => {
    const recordingParaAnotacao = await getRecordingById(recordingId, [
        "id",
        "ignore",
        "observation",
        "babyId",
        "recordingDate",
        "moveId",
        "movAux",
        "projectId",
    ]);
    if (!recordingParaAnotacao) throw new ApiError(httpStatus.NOT_FOUND, "Recording não encontrado.");
    const annotationToCreate = annotations.map((annotation) => ({
        ...annotation,
        recordingId,
    }));
    const frames = annotationToCreate.map((annotation) => annotation.frames);
    if (frames.length < 1 || frames.length > 2)
        throw new Error("The frames array must have either one or two elements.");

    const createdAnnotations = await prisma.annotation.createManyAndReturn({
        data: annotationToCreate,
    });

    return createdAnnotations;
};



export default {
    createRecording,
    queryRecording,
    getRecordingById,
    createAnnotation,
};
