import { EventType } from "@prisma/client";
import {
    tNovoEventType,
    PartialEntity,
    tValidCreateSchema,
    tValidQuerySchema,
    tValidParamsSchema,
    tValidUpdateSchema,
} from "../types/response";
import yup from "../config/yup";
import { InferType } from "yup";

const createEventType: yup.ObjectSchema<tValidCreateSchema<tNovoEventType>> = yup.object({
    body: yup
        .object({
            data: yup
                .array(
                    yup
                        .object({
                            name: yup.string().required("O nome é obrigatório."),
                            description: yup.string().required("A description é obrigatória."),
                            isTemporal: yup.boolean().required("O campo isTemporal é obrigatório."),
                            eventsTypeProject: yup
                                .array(
                                    yup
                                        .object({
                                            projectId: yup.number().required("O projectId é obrigatório."),
                                        })
                                        .noUnknown(true)
                                        .strict()
                                )
                                .required("Deve ser passado um eventsTypeProject."),
                        })
                        .noUnknown(true)
                        .strict()
                )
                .required("Deve ser passado um data."),
        })
        .required("Deve ser passado um body.")
        .noUnknown(true)
        .strict(),
});

const queryEventType: yup.ObjectSchema<
    tValidQuerySchema<PartialEntity<EventType, "name">, PartialEntity<EventType, "name" | "createdAt">>
> = yup.object({
    query: yup
        .object({
            sortBy: yup.mixed<"name" | "createdAt">().oneOf(["name", "createdAt"]),
            sortType: yup.mixed<"asc" | "desc">().oneOf(["asc", "desc"]),
            limit: yup.number().integer("O limit deve ser um número inteiro."),
            page: yup.number().integer("O page deve ser um número inteiro."),
            where: yup
                .object({
                    name: yup.string(),
                })
                .noUnknown(true)
                .strict(),
        })
        .noUnknown(true)
        .strict(),
});

const getEventType: yup.ObjectSchema<tValidParamsSchema<PartialEntity<EventType, "id">>> = yup.object({
    params: yup
        .object({
            id: yup
                .number()
                .integer()
                .required("Deve ser passado um id.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .required("Deve ser passado um params.")
        .noUnknown(true),
});

const updateEventType: yup.ObjectSchema<tValidUpdateSchema<PartialEntity<EventType, "id">, tNovoEventType>> =
    yup.object({
        params: yup
            .object({
                id: yup
                    .number()
                    .integer()
                    .required("Deve ser passado um id.")
                    .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
            })
            .required("Deve ser passado um params.")
            .noUnknown(true),
        body: yup
            .object({
                data: yup
                    .object({
                        name: yup.string().required("O nome é obrigatório."),
                        description: yup.string().required("A description é obrigatória."),
                        isTemporal: yup.boolean().required("O campo isTemporal é obrigatório."),
                        eventsTypeProject: yup
                            .array(
                                yup.object({
                                    projectId: yup.number().required("O projectId é obrigatório."),
                                })
                            )
                            .required("Deve ser passado um eventsTypeProject."),
                    })
                    .noUnknown(true)
                    .strict(),
            })
            .required("Deve ser passado um body.")
            .noUnknown(true)
            .strict(),
    });

const deleteEventType: yup.ObjectSchema<tValidParamsSchema<PartialEntity<EventType, "id">>> = yup.object({
    params: yup.object({
        id: yup
            .number()
            .required("O id é obrigatório.")
            .required("Deve ser passado um id.")
            .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
    }),
});

export type ReqCreateEventType = InferType<typeof createEventType>;
export type ReqQueryEventType = InferType<typeof queryEventType>;
export type ReqGetEventType = InferType<typeof getEventType>;
export type ReqUpdateEventType = InferType<typeof updateEventType>;
export type ReqDeleteEventType = InferType<typeof deleteEventType>;

export default {
    createEventType,
    queryEventType,
    getEventType,
    updateEventType,
    deleteEventType,
};
