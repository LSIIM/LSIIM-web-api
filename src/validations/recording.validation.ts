import { Recording } from "@prisma/client";
import yup from "../config/yup";
import {
    tNovoRecording,
    tNovoAnnotation,
    PartialEntity,
    tValidCreateSchema,
    tValidDeleteSchema,
    tValidParamsSchema,
    tValidQuerySchema,
    tValidUpdateSchema,
} from "../types/response";
import { InferType } from "yup";

const queryRecording: yup.ObjectSchema<
    tValidQuerySchema<
        PartialEntity<Recording, "babyId" | "moveId" | "projectId">,
        PartialEntity<Recording, "id" | "createdAt">
    >
> = yup.object({
    query: yup
        .object({
            sortBy: yup.mixed<"id" | "createdAt">().oneOf(["id"]),
            sortType: yup.mixed<"asc" | "desc">().oneOf(["asc", "desc"]),
            limit: yup.number().integer("O limit deve ser um número inteiro."),
            page: yup.number().integer("O page deve ser um número inteiro."),
            where: yup
                .object({
                    babyId: yup.number(),
                    projectId: yup.number(),
                    moveId: yup.number(),
                })
                .noUnknown(true)
                .strict(),
        })
        .noUnknown(true)
        .strict(),
});

const getRecording: yup.ObjectSchema<tValidParamsSchema<PartialEntity<Recording, "id">>> = yup.object({
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

const createAnnotation: yup.ObjectSchema<tValidCreateSchema<tNovoAnnotation>> = yup.object({
    params: yup
        .object({
            recordingId: yup
                .number()
                .required("Deve ser passado um recordingId.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .required("Deve ser passado um params.")
        .noUnknown(true),
    body: yup
        .object({
            data: yup
                .array(
                    yup
                        .object({
                            projectVideoTypeId: yup
                                .number()
                                .integer()
                                .required("Deve ser passado um projectVideoTypeId."),
                            annotationTypeId: yup.number().integer().required("Deve ser passado um annotationTypeId."),
                            frames: yup
                                .array(yup.number().integer().required("Frames precisam ser passados"))
                                .required("Deve ser passado um frame."),
                            comment: yup.string(),
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

export type ReqQueryRecording = InferType<typeof queryRecording>;
export type ReqGetRecording = InferType<typeof getRecording>;
export type ReqCreateAnnotation = InferType<typeof createAnnotation>;

export default {
    queryRecording,
    getRecording,
    createAnnotation,
};
