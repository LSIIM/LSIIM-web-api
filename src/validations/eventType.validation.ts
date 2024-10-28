import { EventType } from "@prisma/client";
import {
    tNovoEventType,
    PartialEntity,
    tValidCreateSchema,
    tValidQuerySchema,
    tValidParamsSchema,
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
                            description: yup.string().required("A descrição é obrigatória."),
                            isTemporal: yup.boolean().required("O campo isTemporal é obrigatório."),
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
    params: yup.object({
        id: yup.number().required("O id é obrigatório."),
    }),
});

export type ReqCreateEventType = InferType<typeof createEventType>;
export type ReqQueryEventType = InferType<typeof queryEventType>;
export type ReqGetEventType = InferType<typeof getEventType>;

export default {
    createEventType,
    queryEventType,
    getEventType,
};
