import { Project, ProjectVideoType } from "@prisma/client";
import yup from "../config/yup";
import {PartialEntity, tValidQuerySchema, tValidCreateSchema} from "../types/response";
import { InferType } from "yup";

const queryProject: yup.ObjectSchema<
    tValidQuerySchema<
        PartialEntity<Project, "projectName">,
        PartialEntity<Project, "id" | "projectName">
    >
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


const queryProjectVideoType: yup.ObjectSchema<
    tValidQuerySchema<
        PartialEntity<ProjectVideoType, "isMain" | "typeName">,
        PartialEntity<ProjectVideoType, "id" | "isMain" | "typeName">
    >
> = yup.object({
    params:
        yup.object({
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

export type ReqQueryProjectVideoType = InferType<typeof queryProjectVideoType>;
export type ReqQueryProject = InferType<typeof queryProject>;

export default {
    queryProjectVideoType,
    queryProject
}