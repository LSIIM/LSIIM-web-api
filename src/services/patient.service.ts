import { Patient } from "@prisma/client";
import httpStatus from "../utils/httpStatus";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { PartialEntity, tNovoPatient } from "../types/response";

const createPatient = async (novoPatient: tNovoPatient[]): Promise<Patient[]> => {
    const patient = novoPatient.map((patient) => {
        return prisma.patient.create({
            data: {
                ...patient,
                projects: {
                    create: patient.projects.map((ppsf) => ({ ...ppsf })),
                },
            },
        });
    });
    const patientCriados = await prisma.$transaction([...patient]);

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
    query: {
        limit?: number;
        page?: number;
        sortBy?: Key;
        sortType?: "asc" | "desc";
        where?: { name?: string; birthDate?: Date; projectId?: number };
    },
    keys: Key[] = ["id", "name", "birthDate", "observation", "projects", "ativo"] as Key[]
): Promise<Pick<Patient, Key>[]> => {
    const { name, birthDate, projectId } = query.where ?? {};
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "name";
    const sortType = query.sortType ?? "asc";

    //Busca informações do BEBE
    const patient = await prisma.patient.findMany({
        where: {
            name,
            birthDate,
            projects: {
                some: {
                    projectId,
                },
            },
        },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return patient as Pick<Patient, Key>[];
};

/**
 * Get Patient info by id
 * @param {number} id
 */

const getPatientById = async <Key extends keyof Patient>(
    id: number,
    keys: Key[] = ["id", "name", "birthDate", "observation", "projects", "ativo", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<Patient, Key> | null> => {
    return (await prisma.patient.findUnique({
        where: { id: Number(id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    })) as Promise<Pick<Patient, Key> | null>;
};

/**
 * Update PatientInfo by id
 * @param {object} dadosPatientInfo
 * @return {Promise<Patient>}
 */
const updatePatient = async <Key extends keyof Patient>(
    dadosPatientInfo: tNovoPatient & PartialEntity<Patient, "id">,
    keys: Key[] = ["id", "name", "birthDate", "observation", "projects", "ativo", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<Patient, Key> | null> => {
    //Busca bebê info pelo id, confere se existe
    const patientToEdit = await getPatientById(dadosPatientInfo.id);
    if (!patientToEdit) throw new ApiError(httpStatus.NOT_FOUND, "Informações do bebê não encontradas.");

    const _deletePatientProjects = prisma.patientProjectSpecialFeature.deleteMany({
        where: {
            patientId: dadosPatientInfo.id,
        },
    });

    const updatePatient = prisma.patient.update({
        where: { id: dadosPatientInfo.id },
        data: {
            ...dadosPatientInfo,
            projects: {
                create: dadosPatientInfo.projects.map((ppsf) => ({ ...ppsf })),
            },
        },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    });

    const [_, updatedPatient] = await prisma.$transaction([_deletePatientProjects, updatePatient]);

    return updatedPatient as Pick<Patient, Key> | null;
};

/**
 * Delete PatientInfo by id
 * @param {number} id
 */
const deletePatient = async (id: number): Promise<void> => {
    //Busca bebê info pelo id, confere se existe
    const patientInfoToDelete = await getPatientById(Number(id));
    if (!patientInfoToDelete) throw new ApiError(httpStatus.NOT_FOUND, "Informações do bebê não encontradas.");

    await prisma.patient.update({
        where: { id: Number(id) },
        data: {
            ativo: false,
        },
    });
};
export default {
    createPatient,
    queryPatient,
    getPatientById,
    updatePatient,
    deletePatient,
};
