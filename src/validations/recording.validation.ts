import { Recording } from "@prisma/client";
import yup from "../config/yup";
import {
    tNovoRecording,
    PartialEntity,
    tNovoAnnResult,
    tValidCreateSchema,
    tValidCustomCreate,
    tValidDeleteSchema,
    tValidParamsSchema,
    tValidQuerySchema,
    tValidUpdateSchema,
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
                            movAux: yup.boolean().required("Deve ser passado um movAux."),
                            projectId: yup.number().integer().required("Deve ser passado um projectId."),
                            camInfoId: yup.number().integer().required("Deve ser passado um camInfoId."),
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

// const createAnnAndRes: yup.ObjectSchema<tValidCreateSchema<tNovoAnnResult>> = yup.object({
//     params: yup
//         .object({
//             recordingId: yup
//                 .number()
//                 .required("Deve ser passado um recordingId.")
//                 .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
//         })
//         .required("Deve ser passado um params.")
//         .noUnknown(true),
//     body: yup
//         .object({
//             data: yup
//                 .array(
//                     yup
//                         .object({
//                             events: yup
//                                 .array(
//                                     yup
//                                         .object({
//                                             projectVideoTypeId: yup
//                                                 .number()
//                                                 .integer()
//                                                 .required("Deve ser passado um projectVideoTypeId."),
//                                             annotationTypeId: yup
//                                                 .number()
//                                                 .integer()
//                                                 .required("Deve ser passado um annotationTypeId."),
//                                             frames: yup
//                                                 .array(yup.number().integer().required("Frames precisam ser passados"))
//                                                 .required("Deve ser passado um frame."),
//                                             comment: yup.string(),
//                                         })
//                                         .noUnknown(true)
//                                         .strict()
//                                 )
//                                 .required("Deve ser passado um events."),
//                             results: yup
//                                 .array(
//                                     yup
//                                         .object({
//                                             resultTypeId: yup
//                                                 .number()
//                                                 .integer()
//                                                 .required("Deve ser passado um resultTypeId."),
//                                             projectVideoTypeId: yup
//                                                 .number()
//                                                 .integer()
//                                                 .required("Deve ser passado um projectVideoTypeId."),
//                                             resultTypeOptionId: yup
//                                                 .number()
//                                                 .integer()
//                                                 .required("Deve ser passado um resultTypeOptionId."),
//                                             scalarResult: yup.number(),
//                                         })
//                                         .noUnknown(true)
//                                         .strict()
//                                 )
//                                 .required("Deve ser passado um results."),
//                         })
//                         .noUnknown(true)
//                         .strict()
//                 )
//                 .required("Deve ser passado um data."),
//         })
//         .required("Deve ser passado um body.")
//         .noUnknown(true)
//         .strict(),
// });

export type ReqCreateRecording = InferType<typeof createRecording>;
export type ReqQueryRecording = InferType<typeof queryRecording>;
export type ReqGetRecording = InferType<typeof getRecording>;
//export type ReqCreateAnnotationAndResult = InferType<typeof createAnnAndRes>;

export default {
    createRecording,
    queryRecording,
    getRecording,
   // createAnnAndRes,
};
