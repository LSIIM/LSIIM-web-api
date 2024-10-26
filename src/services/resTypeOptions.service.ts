import { ResultTypeOptions } from "@prisma/client";
import httpStatus from "../utils/httpStatus";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { tNovoResultsTypeOptions } from "../types/response";

const createResultTypeOptions = async (
    novoResultTypeOptions: tNovoResultsTypeOptions[]
): Promise<ResultTypeOptions[]> => {
    const _createResultTypeOptions = prisma.resultTypeOptions.createManyAndReturn({
        data: novoResultTypeOptions,
    });

    const [resultTypeOptionsCriados] = await prisma.$transaction([_createResultTypeOptions]);
    return resultTypeOptionsCriados;
};

const queryResultTypeOptions = async <Key extends keyof ResultTypeOptions>(
    query: {
        limit?: number;
        page?: number;
        sortBy?: Key;
        sortType?: "asc" | "desc";
        where?: { name?: string };
    },
    keys: Key[] = ["id", "name", "description", "resultTypeId", "resultType", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<ResultTypeOptions, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    const resultTypeOptions = await prisma.resultTypeOptions.findMany({
        where: query.where,
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return resultTypeOptions as Pick<ResultTypeOptions, Key>[];
};

const getResultTypeOptionsById = async (resultTypeOptionsId: number): Promise<ResultTypeOptions> => {
    const resultTypeOptions = await prisma.resultTypeOptions.findUnique({
        where: { id: resultTypeOptionsId },
    });

    if (!resultTypeOptions) {
        throw new ApiError(httpStatus.NOT_FOUND, "ResultTypeOptions not found");
    }

    return resultTypeOptions;
};

export default { createResultTypeOptions, queryResultTypeOptions, getResultTypeOptionsById };
