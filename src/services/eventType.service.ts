import { EventType } from ".prisma/client";
import { PartialEntity, tNovoEventType } from "../types/response";
import httpStatus from "../utils/httpStatus";
import prisma from "../client";
import ApiError from "../utils/apiError";

const createEventType = async (eventType: tNovoEventType[]): Promise<EventType[]> => {
    const _eventType = prisma.eventType.createManyAndReturn({
        data: eventType,
    });

    const [eventTypeCriado] = await prisma.$transaction([_eventType]);
    return eventTypeCriado;
};

const queryEventType = async <Key extends keyof EventType>(
    query: {
        limit?: number;
        page?: number;
        sortBy?: "name" | "createdAt";
        sortType?: "asc" | "desc";
        where?: { name?: string };
    },
    keys: Key[] = ["id", "name", "description", "isTemporal"] as Key[]
): Promise<Pick<EventType, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "name";
    const sortType = query.sortType ?? "asc";

    const eventType = await prisma.eventType.findMany({
        where: query.where,
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return eventType as Pick<EventType, Key>[];
};

const getEventType = async <Key extends keyof EventType>(
    id: number,
    keys: Key[] = ["id", "name", "description", "isTemporal"] as Key[]
): Promise<Pick<EventType, Key> | null> => {
    return (await prisma.eventType.findUnique({
        where: { id: Number(id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    })) as Promise<Pick<EventType, Key> | null>;
};


export default {
    createEventType,
    queryEventType,
    getEventType,
};
