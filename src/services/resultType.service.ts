import { ResultType } from "@prisma/client";
import httpStatus from "../utils/httpStatus";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { PartialEntity, tNovoResultType } from "../types/response";

const createResultType = async (novoResultType: tNovoResultType[]): Promise<ResultType[]> => {
    const _createResultType = novoResultType.map((resultType) => {
        return prisma.resultType.create({
            data: {
                ...resultType,
                resultsTypeProject: {
                    create: resultType.resultsTypeProject.map((projectId) => ({ ...projectId })),
                },
            },
        });
    });
    const resultTypeCriados = await prisma.$transaction([..._createResultType]);
    return resultTypeCriados;
};

const queryResultType = async <Key extends keyof ResultType>(
    query: {
        limit?: number;
        page?: number;
        sortBy?: Key;
        sortType?: "asc" | "desc";
        where?: { name?: string };
    },
    keys: Key[] = ["id", "name", "description", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<ResultType, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    const resultType = await prisma.resultType.findMany({
        where: query.where,
        select: {
            ...keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
            resultsTypeProject: { include: { project: true } },
        },
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return resultType as unknown as Pick<ResultType, Key>[];
};

const getResultTypeById = async (id: number): Promise<ResultType> => {
    const resultType = await prisma.resultType.findUnique({
        where: { id: Number(id), ativo: true },
        include: {
            resultsTypeProject: true,
        },
    });

    if (!resultType) throw new ApiError(httpStatus.NOT_FOUND, "ResultType not found");

    return resultType;
};

const updateResultType = async <Key extends keyof ResultType>(
    resultTypeInfos: tNovoResultType & PartialEntity<ResultType, "id">,
    keys: Key[] = ["id", "name", "description", "resultTypesOptions", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<ResultType, Key> | null> => {
    const resultTypeToEdit = await getResultTypeById(Number(resultTypeInfos.id));
    if (!resultTypeToEdit) throw new ApiError(httpStatus.NOT_FOUND, "ResultType not found");


    const _deleteRTProject = prisma.resultTypeProject.deleteMany({
        where: {
            resultTypeId: resultTypeInfos.id,
        },
    });

    const updateResultType = prisma.resultType.update({
        where: { id: Number(resultTypeInfos.id) },
        data: {
            ...resultTypeInfos,
            resultsTypeProject: {
                create: resultTypeInfos.resultsTypeProject.map((projectId) => ({ ...projectId })),
            },
        },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    });

    const [_, updatedResultType] = await prisma.$transaction([_deleteRTProject, updateResultType]);
    return updatedResultType as Pick<ResultType, Key> | null;
};

const deleteResultType = async (id: number): Promise<void> => {
    const resultTypeToDelete = await getResultTypeById(id);
    if (!resultTypeToDelete) throw new ApiError(httpStatus.NOT_FOUND, "ResultType not found");

    const softDeleteResultType = prisma.resultType.update({
        where: { id: Number(id) },
        data: { ativo: false },
    });

    await prisma.$transaction([softDeleteResultType]);
};

export default { createResultType, queryResultType, getResultTypeById, updateResultType, deleteResultType };
