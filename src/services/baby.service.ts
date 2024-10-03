import { BabyInfo } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { PartialEntity, tNovoBabyInfo } from "../types/response";

const createBabyInfo = async (newBabyInfo: tNovoBabyInfo[]): Promise<BabyInfo[]> => {    
    const babyInfo = prisma.babyInfo.createManyAndReturn({
        data: newBabyInfo,
    });

    const [babyInfoCriados] = await prisma.$transaction([babyInfo]);

    return babyInfoCriados;
};

/**
 * Query for categorias
 * @param {Object} query - Opções de busca
 * @param {string} [query.sortBy] - Organiza pelo paramêtro passado
 * @param {string} [query.sortType] - Tipo de organização ("asc" => crescente, "desc" => decrescente)
 * @param {number} [query.limit] - Limite de dados por páginas a serem buscados (default = 10)
 * @param {number} [query.page] - Página atual (default = 0)
 * @param {Object} [query.where] - Opções de where para usar no prisma
 * @returns {Promise<QueryResult>}
 */
const queryBabyInfo = async <Key extends keyof BabyInfo>(
    query: { limit?: number; page?: number; sortBy?: Key; sortType?: "asc" | "desc"; where?: { name?: string } },
    keys: Key[] = [
        "id",
        "name",
        "birthDate",
        "isPremature",
        "gestationalAge",
        "atipicidade",
        "createdAt",
        "updatedAt",
    ] as Key[]
): Promise<Pick<BabyInfo, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "name";
    const sortType = query.sortType ?? "asc";

    //Busca informações do BEBE
    const babyInfo = await prisma.babyInfo.findMany({
        where: query.where,
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return babyInfo as Pick<BabyInfo, Key>[];
};

/**
 * Get baby info by id
 * @param {number} id
 */

const getBabyInfoById = async <Key extends keyof BabyInfo>(
    id: number,
    keys: Key[] = [
        "id",
        "name",
        "birthDate",
        "isPremature",
        "gestationalAge",
        "atipicidade",
        "createdAt",
        "updatedAt",
    ] as Key[]
): Promise<Pick<BabyInfo, Key> | null> => {
    return (await prisma.babyInfo.findUnique({
        where: { id },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    })) as Promise<Pick<BabyInfo, Key> | null>;
};

/**
 * Update BabyInfo by id
 * @param {object} dadosBabyInfo
 * @return {Promise<BabyInfo>}
 */
const updateBabyInfo = async <Key extends keyof BabyInfo>(
    dadosBabyInfo: {
        name?: string;
        birthDate?: Date;
        isPremature?: boolean;
        gestationalAge?: number;
        atipicidade?: string;
    } & PartialEntity<BabyInfo, "id">,
    keys: Key[] = [
        "id",
        "name",
        "birthDate",
        "isPremature",
        "gestationalAge",
        "atipicidade",
        "createdAt",
        "updatedAt",
    ] as Key[]
): Promise<Pick<BabyInfo, Key> | null> => {
    //Busca bebê info pelo id, confere se existe
    const babyInfoToEdit = await getBabyInfoById(dadosBabyInfo.id);
    if (!babyInfoToEdit) throw new ApiError(httpStatus.NOT_FOUND, "Informações do bebê não encontradas.");

    const updateBaby = prisma.babyInfo.update({
        where: { id: dadosBabyInfo.id },
        data: dadosBabyInfo,
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    });

    const [updatedBabyInfo] = await prisma.$transaction([updateBaby]);

    return updatedBabyInfo as Pick<BabyInfo, Key> | null;
};

/**
 * Delete BabyInfo by id
 * @param {number} id
 */
const deleteBabyInfo = async (id: number): Promise<void> => {
    //Busca bebê info pelo id, confere se existe
    const babyInfoToDelete = await getBabyInfoById(id);
    if (!babyInfoToDelete) throw new ApiError(httpStatus.NOT_FOUND, "Informações do bebê não encontradas.");

    await prisma.babyInfo.delete({ where: { id } });
}
export default {
    createBabyInfo,
    queryBabyInfo,
    getBabyInfoById,
    updateBabyInfo,
    deleteBabyInfo,
};
