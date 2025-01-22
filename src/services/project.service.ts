import { AnnotationVideo, MoveInfo, Project, ProjectVideoType } from "@prisma/client";
import httpStatus from "../utils/httpStatus";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { PartialEntity, tNovoMoveInfo, tNovoProject, tNovoProjectVideoType } from "../types/response";

/**
 * Create a project
 * @param {Project} project - Projeto a ser criado
 * @returns {Promise<Project>}
 */
const createProject = async (novoProject: tNovoProject[]): Promise<Project[]> => {
    const project = novoProject.map((project) => {
        return prisma.project.createManyAndReturn({
            data: { ...project },
        });
    });
    const [projectCreated] = await prisma.$transaction([...project]);
    return projectCreated;
};

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
    keys: Key[] = [
        "id",
        "projectName",
        "description",
        "patientSpecialFetauresTemplate",
        "ativo",
        "createdAt",
        "updatedAt",
        "movesInfo",
    ] as Key[]
): Promise<Pick<Project, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    //Busca informações do project
    const projects = await prisma.project.findMany({
        where: query.where,
        select: {
            ...keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
            projectsVideoTypes: { include: { videos: { include: { camInfo: true } } } },
        },
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return projects as unknown as Pick<Project, Key>[];
};

/*
 * Get project by id
 * @param {number} id - Id do projeto
 * @returns {Promise<Project>}
 */

const getProjectById = async <Key extends keyof Project>(
    id: number,
    keys: Key[] = [
        "id",
        "projectName",
        "patientSpecialFetauresTemplate",
        "description",
        "ativo",
        "createdAt",
        "updatedAt",
        "projectsVideoTypes",
    ] as Key[]
): Promise<Pick<Project, Key>> => {
    const project = await prisma.project.findUnique({
        where: { id: Number(id) },
        select: { ...keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}), movesInfo: true },
    });

    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Projeto não encontrado.");

    return project as unknown as Pick<Project, Key>;
};
const updateProject = async (projectInfos: tNovoProject & PartialEntity<Project, "id">) => {
    const projectToEdit = await getProjectById(Number(projectInfos.id));
    if (!projectToEdit) throw new ApiError(httpStatus.NOT_FOUND, "Projeto não encontrado.");
    const updateProject = prisma.project.update({
        where: { id: Number(projectInfos.id) },
        data: {
            ...projectInfos,
        },
    });
    const projectUpdated = await prisma.$transaction([updateProject]);
    return projectUpdated;
};

const deleteProject = async (id: number) => {
    const projectToDelete = await getProjectById(Number(id));
    if (!projectToDelete) throw new ApiError(httpStatus.NOT_FOUND, "Projeto não encontrado.");
    const deleteProject = prisma.project.update({
        where: { id: Number(id) },
        data: {
            ativo: false,
        },
    });
    await prisma.$transaction([deleteProject]);
};

//!PROJECT VIDEO TYPE
const createProjectVideoType = async (projectVideoType: tNovoProjectVideoType[]): Promise<ProjectVideoType[]> => {
    const createProjectVideoType = projectVideoType.map((projectVideoType) => {
        return prisma.projectVideoType.create({
            data: { ...projectVideoType },
        });
    });
    const [projectVideoTypeCreated] = await prisma.$transaction([...createProjectVideoType]);
    return [projectVideoTypeCreated];
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
    keys: Key[] = ["id", "isMain", "typeName", "project"] as Key[]
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

const getProjectVideoTypeById = async <Key extends keyof ProjectVideoType>(
    id: number,
    keys: Key[] = ["id", "isMain", "typeName", "projectId", "project"] as Key[]
): Promise<Pick<ProjectVideoType, Key>> => {
    const projectVideoType = await prisma.projectVideoType.findUnique({
        where: { id: Number(id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    });
    if (!projectVideoType) throw new ApiError(httpStatus.NOT_FOUND, "Projeto Video Type não encontrado.");
    return projectVideoType as Pick<ProjectVideoType, Key>;
};

const updateProjectVideoType = async (
    projectVideoType: tNovoProjectVideoType & PartialEntity<ProjectVideoType, "id">
): Promise<ProjectVideoType> => {
    const projectVideoTypeToEdit = await getProjectVideoTypeById(Number(projectVideoType.id));
    if (!projectVideoTypeToEdit) throw new ApiError(httpStatus.NOT_FOUND, "Projeto Video Type não encontrado.");
    const updateProjectVideoType = prisma.projectVideoType.update({
        where: { id: Number(projectVideoType.id) },
        data: {
            ...projectVideoType,
        },
    });
    const projectVideoTypeUpdated = await prisma.$transaction([updateProjectVideoType]);
    return projectVideoTypeUpdated as unknown as ProjectVideoType;
};

const deleteProjectVideoType = async (id: number): Promise<void> => {
    const projectVideoTypeToDelete = await getProjectVideoTypeById(Number(id));
    if (!projectVideoTypeToDelete) throw new ApiError(httpStatus.NOT_FOUND, "Projeto Video Type não encontrado.");
    const deleteProjectVideoType = prisma.projectVideoType.delete({
        where: { id: Number(id) },
    });
    await prisma.$transaction([deleteProjectVideoType]);
};

//!MOVES INFO
const createMovesInfo = async (projectId: number, movesInfo: tNovoMoveInfo[]): Promise<MoveInfo[]> => {
    const _createMovesInfo = movesInfo.map((moveInfo) => {
        return prisma.moveInfo.create({
            data: { ...moveInfo, projectId: projectId },
        });
    });

    const movesInfoCreated = await prisma.$transaction([..._createMovesInfo]);
    return movesInfoCreated;
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
const queryMovesInfo = async <Key extends keyof MoveInfo>(
    projectId: number,
    query: {
        limit?: number;
        page?: number;
        sortBy?: Key;
        sortType?: "asc" | "desc";
    },
    keys: Key[] = ["id", "description", "projectId", "project", "defaultCamId", "defaultCam"] as Key[]
): Promise<Pick<MoveInfo, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    const project = await getProjectById(projectId);
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Projeto não encontrado.");
    const moves = await prisma.moveInfo.findMany({
        where: { projectId: Number(project.id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return moves as Pick<MoveInfo, Key>[];
};

const getMoveInfoById = async <Key extends keyof MoveInfo>(
    id: number,
    keys: Key[] = ["id", "description", "projectId", "project", "defaultCamId", "defaultCam"] as Key[]
): Promise<Pick<MoveInfo, Key>> => {
    const moveInfo = await prisma.moveInfo.findUnique({
        where: { id: Number(id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    });
    if (!moveInfo) throw new ApiError(httpStatus.NOT_FOUND, "Move Info não encontrado.");
    return moveInfo as Pick<MoveInfo, Key>;
};

const updateMoveInfo = async (moveInfo: tNovoMoveInfo & PartialEntity<MoveInfo, "id">): Promise<MoveInfo> => {
    const moveInfoToEdit = await getMoveInfoById(Number(moveInfo.id));
    if (!moveInfoToEdit) throw new ApiError(httpStatus.NOT_FOUND, "Move Info não encontrado.");

    const updateMoveInfo = prisma.moveInfo.update({
        where: { id: Number(moveInfo.id) },
        data: {
            ...moveInfo,
        },
    });

    const moveInfoUpdated = await prisma.$transaction([updateMoveInfo]);
    return moveInfoUpdated as unknown as MoveInfo;
};

const deleteMoveInfo = async (id: number): Promise<void> => {
    const moveInfoToDelete = await getMoveInfoById(Number(id));
    if (!moveInfoToDelete) throw new ApiError(httpStatus.NOT_FOUND, "Move Info não encontrado.");

    const deleteMoveInfo = prisma.moveInfo.delete({
        where: { id: Number(id) },
    });

    await prisma.$transaction([deleteMoveInfo]);
};

const queryEventsResults = async <Key extends keyof AnnotationVideo>(
    projectId: number,
    query: {
        limit?: number;
        page?: number;
        sortBy?: Key;
        sortType?: "asc" | "desc";
    },
    keys: Key[] = ["id", "events", "results"] as Key[]
): Promise<Pick<AnnotationVideo, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    const project = await getProjectById(projectId);
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Projeto não encontrado.");
    const events = await prisma.project.findMany({
        where: { id: Number(project.id) },
        select: {
            projectsVideoTypes: {
                select: {
                    id: true,
                    videos: { select: { annotationVideos: { select: { id: true, events: true, results: true } } } },
                },
            },
        },
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return events as unknown as Pick<AnnotationVideo, Key>[];
};

export default {
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
    queryProject,

    createProjectVideoType,
    queryProjectVideoType,
    getProjectVideoTypeById,
    updateProjectVideoType,
    deleteProjectVideoType,

    createMovesInfo,
    queryMovesInfo,
    getMoveInfoById,
    updateMoveInfo,
    deleteMoveInfo,

    queryEventsResults,
};
