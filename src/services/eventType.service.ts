import { EventType } from ".prisma/client";
import { PartialEntity, tNovoEventType } from "../types/response";
import httpStatus from "../utils/httpStatus";
import prisma from "../client";
import ApiError from "../utils/apiError";

const createEventType = async (eventsType: tNovoEventType[]): Promise<EventType[]> => {
    const _eventType = eventsType.map((ev) => {
        return prisma.eventType.create({
            data: {
                ...ev,
                eventsTypeProject: {
                    create: ev.eventsTypeProject.map((projectId) => ({ ...projectId })),
                },
            },
        });
    });

    const eventTypeCriado = await prisma.$transaction([..._eventType]);
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
    keys: Key[] = ["id", "name", "description", "isTemporal", "ativo"] as Key[]
): Promise<Pick<EventType, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "name";
    const sortType = query.sortType ?? "asc";

    const eventType = await prisma.eventType.findMany({
        where: query.where,
        select: {
            ...keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
            eventsTypeProject: { include: { project: true } },
        },
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return eventType as unknown as Pick<EventType, Key>[];
};

const getEventType = async <Key extends keyof EventType>(
    id: number,
    keys: Key[] = ["id", "name", "description", "isTemporal", "eventsTypeProject", "ativo"] as Key[]
): Promise<Pick<EventType, Key> | null> => {
    return (await prisma.eventType.findUnique({
        where: { id: Number(id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    })) as Promise<Pick<EventType, Key> | null>;
};

const updateEventType = async <Key extends keyof EventType>(
    eventTypeInfos: tNovoEventType & PartialEntity<EventType, "id">,
    keys: Key[] = ["id", "name", "description", "isTemporal", "eventsTypeProject"] as Key[]
): Promise<Pick<EventType, Key> | null> => {
    const eventTypeToEdit = await getEventType(eventTypeInfos.id);

    if (!eventTypeToEdit) throw new ApiError(httpStatus.NOT_FOUND, "Evento não encontrado.");

    const _deleteETProject = prisma.eventTypeProject.deleteMany({
        where: { eventTypeId: Number(eventTypeInfos.id) },
    });

    const updateEventType = prisma.eventType.update({
        where: { id: Number(eventTypeInfos.id) },
        data: {
            ...eventTypeInfos,
            eventsTypeProject: {
                create: eventTypeInfos.eventsTypeProject.map((projectId) => ({ ...projectId })),
            },
        },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    });

    const [_, updatedEventType] = await prisma.$transaction([_deleteETProject, updateEventType]);
    return updatedEventType as Pick<EventType, Key> | null;
};

const deleteEventType = async (id: number): Promise<void> => {
    const eventTypeToDelete = await getEventType(Number(id));
    if (!eventTypeToDelete) throw new ApiError(httpStatus.NOT_FOUND, "Evento não encontrado.");

    const softDelete = prisma.eventType.update({
        where: { id: Number(id) },
        data: { ativo: false },
    });

    await prisma.$transaction([softDelete]);
};
export default {
    createEventType,
    queryEventType,
    getEventType,
    updateEventType,
    deleteEventType,
};
