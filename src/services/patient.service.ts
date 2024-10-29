import { Patient } from "@prisma/client";
import httpStatus from "../utils/httpStatus";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { PartialEntity, tNovoPatient } from "../types/response";

const createPatient = async (newBabyInfo: tNovoPatient[]): Promise<Patient[]> => {
    const patient = prisma.patient.createManyAndReturn({
        data: newBabyInfo,
    });

    const [patientCriados] = await prisma.$transaction([patient]);

    return patientCriados;
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
const queryPatient = async <Key extends keyof Patient>(
    query: { limit?: number; page?: number; sortBy?: Key; sortType?: "asc" | "desc"; where?: { name?: string } },
    keys: Key[] = [
        "id",
        "name",
        "birthDate",
        "isPremature",
        "gestationalAge",
        "atipicidades",
        "createdAt",
        "updatedAt",
    ] as Key[]
): Promise<Pick<Patient, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "name";
    const sortType = query.sortType ?? "asc";

    //Busca informações do BEBE
    const patient = await prisma.patient.findMany({
        where: query.where,
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return patient as Pick<Patient, Key>[];
};

/**
 * Get baby info by id
 * @param {number} id
 */

const getPatientById = async <Key extends keyof Patient>(
    id: number,
    keys: Key[] = [
        "id",
        "name",
        "birthDate",
        "isPremature",
        "gestationalAge",
        "atipicidades",
        "createdAt",
        "updatedAt",
    ] as Key[]
): Promise<Pick<Patient, Key> | null> => {
    return (await prisma.patient.findUnique({
        where: { id: Number(id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    })) as Promise<Pick<Patient, Key> | null>;
};

/**
 * Update BabyInfo by id
 * @param {object} dadosBabyInfo
 * @return {Promise<Patient>}
 */
const updatePatient = async <Key extends keyof Patient>(
    dadosBabyInfo: {
        name?: string;
        birthDate?: Date;
        isPremature?: boolean;
        gestationalAge?: number;
        atipicidade?: string;
    } & PartialEntity<Patient, "id">,
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
): Promise<Pick<Patient, Key> | null> => {
    //Busca bebê info pelo id, confere se existe
    const patientToEdit = await getPatientById(dadosBabyInfo.id);
    if (!patientToEdit) throw new ApiError(httpStatus.NOT_FOUND, "Informações do bebê não encontradas.");

    const updatePatient = prisma.patient.update({
        where: { id: dadosBabyInfo.id },
        data: dadosBabyInfo,
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    });

    const [updatedPatient] = await prisma.$transaction([updatePatient]);

    return updatedPatient as Pick<Patient, Key> | null;
};

/**
 * Delete BabyInfo by id
 * @param {number} id
 */
const deletePatient = async (id: number): Promise<void> => {
    //Busca bebê info pelo id, confere se existe
    const babyInfoToDelete = await getPatientById(id);
    if (!babyInfoToDelete) throw new ApiError(httpStatus.NOT_FOUND, "Informações do bebê não encontradas.");

    await prisma.patient.delete({ where: { id } });
};
export default {
    createPatient,
    queryPatient,
    getPatientById,
    updatePatient,
    deletePatient,
};
