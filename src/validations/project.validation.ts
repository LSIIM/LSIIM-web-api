import { Project, ProjectVideoType, MoveInfo, AnnotationVideo } from "@prisma/client";
import yup from "../config/yup";
import {
    PartialEntity,
    tValidQuerySchema,
    tValidCreateSchema,
    tValidParamsSchema,
    tValidUpdateSchema,
    tValidDeleteSchema,
    tNovoProject,
    tNovoProjectVideoType,
    tValidCreateSchemaWithParams,
    tNovoMoveInfo,
} from "../types/response";
import { InferType } from "yup";

//PROJECT
const createProject: yup.ObjectSchema<tValidCreateSchema<tNovoProject>> = yup.object({
    body: yup
        .object({
            data: yup
                .array(
                    yup
                        .object({
                            projectName: yup
                                .string()
                                .required("Deve ser passado um nome.")
                                .min(3, "O nome deve ter no mínimo 3 caracteres.")
                                .max(50, "O nome deve ter no máximo 50 caracteres."),
                            description: yup.string().required("Deve ser passado uma descrição."),
                            patientSpecialFetauresTemplate: yup
                                .object()
                                .required("Deve ser passado um patientSpecialFetauresTemplate."),
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

const updateProject: yup.ObjectSchema<tValidUpdateSchema<PartialEntity<Project, "id">, tNovoProject>> = yup.object({
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
                    projectName: yup
                        .string()
                        .required("Deve ser passado um nome.")
                        .min(3, "O nome deve ter no mínimo 3 caracteres.")
                        .max(50, "O nome deve ter no máximo 50 caracteres."),
                    description: yup.string().required("Deve ser passado uma descrição."),
                    patientSpecialFetauresTemplate: yup
                        .object()
                        .required("Deve ser passado um patientSpecialFetauresTemplate."),
                })
                .noUnknown(true)
                .strict(),
        })
        .required("Deve ser passado um body.")
        .noUnknown(true)
        .strict(),
});

const deleteProject: yup.ObjectSchema<tValidDeleteSchema<PartialEntity<Project, "id">>> = yup.object({
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

//PROJECT VIDEO TYPE
const createProjectVideoType: yup.ObjectSchema<tValidCreateSchema<tNovoProjectVideoType>> = yup.object({
    body: yup
        .object({
            data: yup
                .array(
                    yup
                        .object({
                            typeName: yup.string().required("Deve ser passado um typeName."),
                            isMain: yup.boolean().required("Deve ser passado um isMain."),
                            projectId: yup.number().required("Deve ser passado um projectId."),
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
const getProjectVideoType: yup.ObjectSchema<tValidParamsSchema<PartialEntity<ProjectVideoType, "id">>> = yup.object({
    params: yup
        .object({
            id: yup
                .number()
                .integer()
                .required("Deve ser passado um id.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .noUnknown(true),
});

const updateProjectVideoType: yup.ObjectSchema<
    tValidUpdateSchema<PartialEntity<ProjectVideoType, "id">, tNovoProjectVideoType>
> = yup.object({
    params: yup
        .object({
            id: yup
                .number()
                .integer()
                .required("Deve ser passado um id.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .noUnknown(true),
    body: yup
        .object({
            data: yup
                .object({
                    typeName: yup.string().required("Deve ser passado um typeName."),
                    isMain: yup.boolean().required("Deve ser passado um isMain."),
                    projectId: yup.number().required("Deve ser passado um projectId."),
                })
                .noUnknown(true)
                .strict(),
        })
        .required("Deve ser passado um body.")
        .noUnknown(true)
        .strict(),
});

const deleteProjectVideoType: yup.ObjectSchema<tValidDeleteSchema<PartialEntity<ProjectVideoType, "id">>> = yup.object({
    params: yup
        .object({
            id: yup
                .number()
                .integer()
                .required("Deve ser passado um id.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .noUnknown(true),
});

//MOVES INFO
const createMoveInfo: yup.ObjectSchema<
    tValidCreateSchemaWithParams<PartialEntity<MoveInfo, "projectId">, tNovoMoveInfo>
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
    body: yup
        .object({
            data: yup
                .array(
                    yup
                        .object({
                            description: yup.string().required("Deve ser passado um description."),
                            defaultCamId: yup.number().required("Deve ser passado um defaultCamId."),
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

const getMoveInfoById: yup.ObjectSchema<tValidParamsSchema<PartialEntity<MoveInfo, "id">>> = yup.object({
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

const updateMoveInfo: yup.ObjectSchema<tValidUpdateSchema<PartialEntity<MoveInfo, "id">, tNovoMoveInfo>> = yup.object({
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
                    description: yup.string().required("Deve ser passado um description."),
                    defaultCamId: yup.number().required("Deve ser passado um defaultCamId."),
                })
                .noUnknown(true)
                .strict(),
        })
        .required("Deve ser passado um body.")
        .noUnknown(true)
        .strict(),
});

const deleteMoveInfo: yup.ObjectSchema<tValidDeleteSchema<PartialEntity<MoveInfo, "id">>> = yup.object({
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

//!EVENTS E RESULTS
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
//PROJECT
export type ReqCreateProject = InferType<typeof createProject>;
export type ReqQueryProject = InferType<typeof queryProject>;
export type ReqGetProjectById = InferType<typeof getProjectById>;
export type ReqUpdateProject = InferType<typeof updateProject>;
export type ReqDeleteProject = InferType<typeof deleteProject>;
//PROJECT VIDEO TYPE
export type ReqCreateProjectVideoType = InferType<typeof createProjectVideoType>;
export type ReqQueryProjectVideoType = InferType<typeof queryProjectVideoType>;
export type ReqGetProjectVideoType = InferType<typeof getProjectVideoType>;
export type ReqUpdateProjectVideoType = InferType<typeof updateProjectVideoType>;
export type ReqDeleteProjectVideoType = InferType<typeof deleteProjectVideoType>;
//MOVES INFO
export type ReqCreateMoveInfo = InferType<typeof createMoveInfo>;
export type ReqQueryMovesInfo = InferType<typeof queryMovesInfo>;
export type ReqGetMoveInfoById = InferType<typeof getMoveInfoById>;
export type ReqUpdateMoveInfo = InferType<typeof updateMoveInfo>;
export type ReqDeleteMoveInfo = InferType<typeof deleteMoveInfo>;
//EVENTS E RESULTS
export type ReqQueryEventsResults = InferType<typeof queryEventsResults>;

export default {
    createProject,
    queryProject,
    getProjectById,
    updateProject,
    deleteProject,
    createProjectVideoType,
    queryProjectVideoType,
    getProjectVideoType,
    updateProjectVideoType,
    deleteProjectVideoType,
    createMoveInfo,
    queryMovesInfo,
    getMoveInfoById,
    updateMoveInfo,
    deleteMoveInfo,
    queryEventsResults,
};
