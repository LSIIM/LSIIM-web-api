import { ResultType } from "@prisma/client";
import httpStatus from "../utils/httpStatus";
import prisma from "../client";
import ApiError from "../utils/apiError";
import { tNovoResultType } from "../types/response";

const createResultType = async (novoResultType: tNovoResultType[]): Promise<ResultType[]> => {
    const _createResultType = prisma.resultType.createManyAndReturn({
        data: novoResultType,
    });

    const [resultTypeCriados] = await prisma.$transaction([_createResultType]);
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
    keys: Key[] = ["id", "name", "description", "resultTypesOptions", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<ResultType, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "id";
    const sortType = query.sortType ?? "asc";

    const resultType = await prisma.resultType.findMany({
        where: query.where,
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return resultType as Pick<ResultType, Key>[];
};


const getResultTypeById = async (resultTypeId: number): Promise<ResultType> => {
    const resultType = await prisma.resultType.findUnique({
        where: { id: resultTypeId },
    });

    if (!resultType) {
        throw new ApiError(httpStatus.NOT_FOUND, "ResultType not found");
    }

    return resultType;
}

export default { createResultType, queryResultType, getResultTypeById };