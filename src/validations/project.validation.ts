import { Project, ProjectVideoType, MoveInfo, AnnotationVideo } from "@prisma/client";
import yup from "../config/yup";
import { PartialEntity, tValidQuerySchema, tValidCreateSchema, tValidParamsSchema } from "../types/response";
import { InferType } from "yup";

const queryProject: yup.ObjectSchema<
    tValidQuerySchema<PartialEntity<Project, "projectName">, PartialEntity<Project, "id" | "projectName">>
> = yup.object({
    query: yup
        .object({
            sortBy: yup.mixed<"id" | "projectName">().oneOf(["id", "projectName"]),
            sortType: yup.mixed<"asc" | "desc">().oneOf(["asc", "desc"]),
            limit: yup.number().integer("O limit deve ser um número inteiro."),
            page: yup.number().integer("O page deve ser um número inteiro."),
            where: yup
                .object({
                    projectName: yup.string(),
                })
                .noUnknown(true)
                .strict(),
        })
        .noUnknown(true)
        .strict(),
});

const getProjectById: yup.ObjectSchema<tValidParamsSchema<PartialEntity<Project, "id">>> = yup.object({
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

const queryProjectVideoType: yup.ObjectSchema<
    tValidQuerySchema<
        PartialEntity<ProjectVideoType, "isMain" | "typeName">,
        PartialEntity<ProjectVideoType, "id" | "isMain" | "typeName">
    >
> = yup.object({
    params: yup
        .object({
            projectId: yup
                .number()
                .integer()
                .required("Deve ser passado um projectId.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .required("Deve ser passado um params.")
        .noUnknown(true),
    query: yup
        .object({
            sortBy: yup.mixed<"id" | "isMain" | "typeName">().oneOf(["id", "isMain", "typeName"]),
            sortType: yup.mixed<"asc" | "desc">().oneOf(["asc", "desc"]),
            limit: yup.number().integer("O limit deve ser um número inteiro."),
            page: yup.number().integer("O page deve ser um número inteiro."),
        })
        .noUnknown(true)
        .strict(),
});

const queryMovesInfo: yup.ObjectSchema<
    tValidQuerySchema<PartialEntity<MoveInfo, "id">, PartialEntity<MoveInfo, "id">>
> = yup.object({
    params: yup
        .object({
            projectId: yup
                .number()
                .integer()
                .required("Deve ser passado um projectId.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .required("Deve ser passado um params.")
        .noUnknown(true),
    query: yup
        .object({
            sortBy: yup.mixed<"id">().oneOf(["id"]),
            sortType: yup.mixed<"asc" | "desc">().oneOf(["asc", "desc"]),
            limit: yup.number().integer("O limit deve ser um número inteiro."),
            page: yup.number().integer("O page deve ser um número inteiro."),
        })
        .noUnknown(true)
        .strict(),
});

const queryEventsResults: yup.ObjectSchema<
    tValidQuerySchema<PartialEntity<AnnotationVideo, "id">, PartialEntity<AnnotationVideo, "id">>
> = yup.object({
    params: yup
        .object({
            projectId: yup
                .number()
                .integer()
                .required("Deve ser passado um projectId.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .required("Deve ser passado um params.")
        .noUnknown(true),
    query: yup
        .object({
            sortBy: yup.mixed<"id">().oneOf(["id"]),
            sortType: yup.mixed<"asc" | "desc">().oneOf(["asc", "desc"]),
            limit: yup.number().integer("O limit deve ser um número inteiro."),
            page: yup.number().integer("O page deve ser um número inteiro."),
        })
        .noUnknown(true)
        .strict(),
});

export type ReqQueryProjectVideoType = InferType<typeof queryProjectVideoType>;
export type ReqQueryMovesInfo = InferType<typeof queryMovesInfo>;
export type ReqQueryProject = InferType<typeof queryProject>;
export type ReqGetProjectById = InferType<typeof getProjectById>;
export type ReqQueryEventsResults = InferType<typeof queryEventsResults>;

export default {
    queryProjectVideoType,
    queryProject,
    queryMovesInfo,
    queryEventsResults,
    getProjectById,
};
