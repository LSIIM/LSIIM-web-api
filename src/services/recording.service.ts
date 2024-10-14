import { Recording, Annotation } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { PartialEntity, tNovoAnnotation, tNovoRecording } from "../types/response";
import fs from "fs";
import path from "path";
import { get } from "http";
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

    const getVideo = (recordingId: number): string[] => {
        const basePath = "/Users/viniciusrosa/Desktop/Vinicius/Lsiim/recordings";
        const pathToVideos = path.join(basePath, String(recordingId));
        try {
            const files = fs.readdirSync(pathToVideos);
            return files.filter((file) => file.endsWith(".avi")).map((file) => path.join(pathToVideos, file));
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const recordingsWithVideo = recordings.map((recording) => ({
        ...recording,
        videos: { url: getVideo((recording as Recording).id), is_main: true },
    }));
    return recordingsWithVideo as unknown as (Pick<Recording, Key> & { videos: { url: string; is_main: string } }[])[];
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
        "createdAt",
        "updatedAt",
    ] as Key[]
): Promise<Pick<Recording, Key> | null> => {
    return (await prisma.recording.findUnique({
        where: { id: Number(id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    })) as Promise<Pick<Recording, Key> | null>;
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

    const annotationsToCreate = annotations.flatMap(({ annotations }) =>
        annotations.map((annotation) => ({ ...annotation, recordingId }))
    );
    const createdAnnotations = await prisma.annotation.createManyAndReturn({
        data: annotationsToCreate,
    });

    return createdAnnotations;
};

export default {
    queryRecording,
    getRecordingById,
    createAnnotation,
};
