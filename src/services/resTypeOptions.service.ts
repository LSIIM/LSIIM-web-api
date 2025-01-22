import { ResultTypeOption } from "@prisma/client";
import httpStatus from "../utils/httpStatus";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { PartialEntity, tNovoResultsTypeOptions } from "../types/response";

const createResultTypeOptions = async (
    resultTypeId: number,
    novoResultTypeOptions: tNovoResultsTypeOptions[]
): Promise<ResultTypeOption[]> => {
    // const findResultType = await prisma.resultTypeOption.findFirst({
    //     where: { resultTypeId: Number(resultTypeId) },
    // });
    // if (findResultType) throw new ApiError(httpStatus.BAD_REQUEST, "Já existe resultTypeOptions com esse resultTypeId");

    const _createResultTypeOptions = novoResultTypeOptions.map((resultTypeOption) =>
        prisma.resultTypeOption.create({
            data: { ...resultTypeOption, resultTypeId: resultTypeId },
        })
    );

    const resultTypeOptionsCriados = await prisma.$transaction([..._createResultTypeOptions]);
    return resultTypeOptionsCriados;
};

const queryResultTypeOptions = async <Key extends keyof ResultTypeOption>(
    query: {
        limit?: number;
        page?: number;
        sortBy?: Key;
        sortType?: "asc" | "desc";
        where?: { name?: string };
    },
    keys: Key[] = ["id", "name", "description", "resultTypeId", "resultType", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<ResultTypeOption, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    const resultTypeOptions = await prisma.resultTypeOption.findMany({
        where: query.where,
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return resultTypeOptions as Pick<ResultTypeOption, Key>[];
};

const getResultTypeOptionsById = async (id: number): Promise<ResultTypeOption> => {
    const resultTypeOptions = await prisma.resultTypeOption.findUnique({
        where: { id: Number(id) },
    });

    if (!resultTypeOptions) throw new ApiError(httpStatus.NOT_FOUND, "ResultTypeOptions not found");

    return resultTypeOptions;
};

const updateResultTypeOptions = async (
    resultTypeinfo: tNovoResultsTypeOptions & PartialEntity<ResultTypeOption, "id">
): Promise<ResultTypeOption> => {
    const findResultType = await getResultTypeOptionsById(Number(resultTypeinfo.id));
    if (!findResultType) throw new ApiError(httpStatus.NOT_FOUND, "Not found");

    const _updateResultTypeOptions = prisma.resultTypeOption.update({
        where: { id: Number(resultTypeinfo.id) },
        data: { ...resultTypeinfo },
    });

    const updatedResultTypeOptions = await prisma.$transaction([_updateResultTypeOptions]);
    return updatedResultTypeOptions as unknown as ResultTypeOption ;
};

const deleteResultTypeOptions = async (id: number): Promise<void> => {
    const findResultType = await getResultTypeOptionsById(Number(id));
    if (!findResultType) throw new ApiError(httpStatus.NOT_FOUND, "Not found");

    const _deleteResultTypeOptions = prisma.resultTypeOption.delete({
        where: { id: Number(id) },
    });

    await prisma.$transaction([_deleteResultTypeOptions]);
};

export default {
    createResultTypeOptions,
    queryResultTypeOptions,
    getResultTypeOptionsById,
    updateResultTypeOptions,
    deleteResultTypeOptions,
};
