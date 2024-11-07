import { AnnotationVideo, Recording } from "@prisma/client";
import yup from "../config/yup";
import {
    tNovoRecording,
    PartialEntity,
    tValidCreateSchema,
    tValidCustomCreate,
    tValidDeleteSchema,
    tValidParamsSchema,
    tValidQuerySchema,
    tValidUpdateSchema,
    tNovoAnnotationVideo,
} from "../types/response";
import { InferType } from "yup";

const createRecording: yup.ObjectSchema<tValidCreateSchema<tNovoRecording>> = yup.object({
    body: yup
        .object({
            data: yup
                .array(
                    yup
                        .object({
                            ignore: yup.boolean().required("Deve ser passado um ignore."),
                            observation: yup.string().required("Deve ser passado um observation."),
                            patientId: yup.number().integer().required("Deve ser passado um babyId."),
                            recordingDate: yup.date().required("Deve ser passado um recordingDate."),
                            moveId: yup.number().integer().required("Deve ser passado um moveId."),
                            projectId: yup.number().integer().required("Deve ser passado um projectId."),
                            recordingsVideos: yup
                                .array(
                                    yup
                                        .object({
                                            projectVideoTypeId: yup
                                                .number()
                                                .required("Deve ser passado um projectVideoTypeId."),
                                            camIdUsed: yup.number().required("Deve ser passado um camIdUsed."),
                                            file: yup.string()
                                        })
                                        .noUnknown(true)
                                        .strict()
                                )
                                .required("Deve ser passado um videos.")
                                .min(1, "Deve ser passado ao menos um video."),
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

const queryRecording: yup.ObjectSchema<
    tValidQuerySchema<
        PartialEntity<Recording, "patientId" | "moveId" | "projectId">,
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
                    patientId: yup.number(),
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

const createAnnAndRes: yup.ObjectSchema<tValidCreateSchema<tNovoAnnotationVideo>> = yup.object({
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
                            recordingVideoId: yup.number().required("Deve ser passado um recordingVideoId."),
                            comment: yup.string(),
                            events: yup
                                .array(
                                    yup.object({
                                        eventTypeId: yup.number().required("Deve ser passado um eventTypeId."),
                                        frames: yup
                                            .array(yup.number().required())
                                            .required("Deve ser passado um frames."),
                                    })
                                )
                                .required("Deve ser passado um annotationEvents."),
                            results: yup.array(
                                yup.object({
                                    resultTypeId: yup.number().required("Deve ser passado um resultTypeId."),
                                    resultTypeOptionId: yup
                                        .number()
                                        .required("Deve ser passado um resultTypeOptionId."),
                                    scalarResults: yup.number(),
                                })
                            ),
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

const queryAnnotatioVideo: yup.ObjectSchema<
    tValidQuerySchema<PartialEntity<AnnotationVideo, "id">, PartialEntity<AnnotationVideo, "id" | "createdAt">>
> = yup.object({
    params: yup
        .object({
            recordingId: yup
                .number()
                .integer()
                .required("Deve ser passado um recordingId.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .required("Deve ser passado um params.")
        .noUnknown(true),
    query: yup
        .object({
            sortBy: yup.mixed<"id" | "createdAt">().oneOf(["id", "createdAt"]),
            sortType: yup.mixed<"asc" | "desc">().oneOf(["asc", "desc"]),
            limit: yup.number().integer("O limit deve ser um número inteiro."),
            page: yup.number().integer("O page deve ser um número inteiro."),
        })
        .noUnknown(true)
        .strict(),
});

export type ReqCreateRecording = InferType<typeof createRecording>;
export type ReqQueryRecording = InferType<typeof queryRecording>;
export type ReqGetRecording = InferType<typeof getRecording>;
export type ReqCreateAnnotationAndResult = InferType<typeof createAnnAndRes>;
export type ReqQueryAnnotationVideo = InferType<typeof queryAnnotatioVideo>;

export default {
    createRecording,
    queryRecording,
    getRecording,
    createAnnAndRes,
    queryAnnotatioVideo,
};
