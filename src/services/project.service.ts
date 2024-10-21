import { MovesInfo, Project, ProjectVideoType } from "@prisma/client";
import httpStatus from './utils/httpStatus';
import prisma from "../client";
import ApiError from "../utils/apiError";

/**
 * Query for project video type
 * @param {Object} query - Opções de busca
 * @param {string} [query.sortBy] - Organiza pelo paramêtro passado
 * @param {string} [query.sortType] - Tipo de organização ("asc" => crescente, "desc" => decrescente)
 * @param {number} [query.limit] - Limite de dados por páginas a serem buscados (default = 10)
 * @param {number} [query.page] - Página atual (default = 0)
 * @param {Object} [query.where] - Opções de where para usar no prisma
 * @returns {Promise<QueryResult>}
 */

const queryProject = async <Key extends keyof Project>(
    query: {
        limit?: number;
        page?: number;
        sortBy?: Key;
        sortType?: "asc" | "desc";
        where?: { projectName?: string };
    },
    keys: Key[] = ["id", "projectName", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<Project, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    //Busca informações do project
    const projects = await prisma.project.findMany({
        where: query.where,
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return projects as Pick<Project, Key>[];
};

/*
 * Get project by id
 * @param {number} id - Id do projeto
 * @returns {Promise<Project>}
 */

const getProjectById = async <Key extends keyof Project>(
    id: number,
    keys: Key[] = ["id", "projectName", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<Project, Key>> => {
    const project = await prisma.project.findUnique({
        where: { id: Number(id) },
    });

    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Projeto não encontrado.");

    return project;
};

/**
 *
 * @param projectId - Id do projeto
 * @param {string} [query.sortBy] - Organiza pelo paramêtro passado
 * @param {string} [query.sortType] - Tipo de organização ("asc" => crescente, "desc" => decrescente)
 * @param {number} [query.limit] - Limite de dados por páginas a serem buscados (default = 10)
 * @param {number} [query.page] - Página atual (default = 0)
 * @param {Object} [query.where] - Opções de where para usar no prisma
 * @returns {Promise<QueryResult>}
 */
const queryProjectVideoType = async <Key extends keyof ProjectVideoType>(
    projectId: number,
    query: {
        limit?: number;
        page?: number;
        sortBy?: Key;
        sortType?: "asc" | "desc";
    },
    keys: Key[] = ["id", "isMain", "typeName"] as Key[]
): Promise<Pick<ProjectVideoType, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    const project = await getProjectById(projectId, ["id", "projectName"]);
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Projeto não encontrado.");
    const projectVideoTypes = await prisma.projectVideoType.findMany({
        where: { projectId: Number(project.id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return projectVideoTypes as Pick<ProjectVideoType, Key>[];
};

/**
 *
 * @param projectId - Id do projeto
 * @param {string} [query.sortBy] - Organiza pelo paramêtro passado
 * @param {string} [query.sortType] - Tipo de organização ("asc" => crescente, "desc" => decrescente)
 * @param {number} [query.limit] - Limite de dados por páginas a serem buscados (default = 10)
 * @param {number} [query.page] - Página atual (default = 0)
 * @param {Object} [query.where] - Opções de where para usar no prisma
 * @returns {Promise<QueryResult>}
 */
const queryMovesInfo = async <Key extends keyof MovesInfo>(
    projectId: number,
    query: {
        limit?: number;
        page?: number;
        sortBy?: Key;
        sortType?: "asc" | "desc";
    },
    keys: Key[] = ["id", "description"] as Key[]
): Promise<Pick<MovesInfo, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    const project = await getProjectById(projectId, ["id", "projectName"]);
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Projeto não encontrado.");
    const moves = await prisma.movesInfo.findMany({
        where: { projectId: Number(project.id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return moves as Pick<MovesInfo, Key>[];
};
export default {
    queryProjectVideoType,
    queryProject,
    queryMovesInfo,
};
