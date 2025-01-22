import { Patient } from "@prisma/client";
import yup from "../config/yup";
import {
    tNovoPatient,
    PartialEntity,
    tValidCreateSchema,
    tValidDeleteSchema,
    tValidParamsSchema,
    tValidQuerySchema,
    tValidUpdateSchema,
} from "../types/response";
import { InferType } from "yup";

const createPatient: yup.ObjectSchema<tValidCreateSchema<tNovoPatient>> = yup.object({
    body: yup
        .object({
            data: yup
                .array(
                    yup
                        .object({
                            name: yup
                                .string()
                                .required("Deve ser passado um nome.")
                                .min(3, "O nome deve ter no mínimo 3 caracteres.")
                                .max(50, "O nome deve ter no máximo 50 caracteres."),
                            birthDate: yup.date().required("Deve ser passado uma data de nascimento."),
                            observation: yup.string().required("Deve ser passado uma observação."),
                            projects: yup
                                .array(
                                    yup
                                        .object({
                                            projectId: yup
                                                .number()
                                                .integer()
                                                .required("Deve ser passado um projectId."),
                                            patientSpecialFeatures: yup
                                                .object()
                                                .required("Deve ser passado um specialFeatureTemplate."),
                                        })
                                        .noUnknown(true)
                                        .strict()
                                )
                                .required("Deve ser passado um patientSpecialFeatures.")
                                .min(1, "Deve ser passado ao menos um patientSpecialFeatures."),
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

const queryPatient: yup.ObjectSchema<
    tValidQuerySchema<PartialEntity<Patient, "name" | "birthDate">, PartialEntity<Patient, "name" | "createdAt">>
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
                    birthDate: yup.date(),
                    projectId: yup.number().integer(),
                })
                .noUnknown(true)
                .strict(),
        })
        .noUnknown(true)
        .strict(),
});

const getPatient: yup.ObjectSchema<tValidParamsSchema<PartialEntity<Patient, "id">>> = yup.object({
    params: yup
        .object({
            id: yup
                .number()
                .integer("O id deve ser um número inteiro.")
                .required("Deve ser passado id pelo params.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .noUnknown(true),
});

const updatePatient: yup.ObjectSchema<tValidUpdateSchema<PartialEntity<Patient, "id">, tNovoPatient>> = yup.object({
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
                    name: yup
                        .string()
                        .required("Deve ser passado um nome.")
                        .min(3, "O nome deve ter no mínimo 3 caracteres.")
                        .max(50, "O nome deve ter no máximo 50 caracteres."),
                    birthDate: yup.date().required("Deve ser passado uma data de nascimento."),
                    observation: yup.string().required("Deve ser passado uma observação."),
                    projects: yup
                        .array(
                            yup
                                .object({
                                    projectId: yup.number().integer().required("Deve ser passado um projectId."),
                                    patientSpecialFeatures: yup
                                        .object()
                                        .required("Deve ser passado um specialFeatureTemplate."),
                                })
                                .noUnknown(true)
                                .strict()
                        )
                        .required("Deve ser passado um array de projects."),
                })
                .noUnknown(true)
                .strict(),
        })
        .noUnknown(true)
        .strict(),
});

const deletePatient: yup.ObjectSchema<tValidDeleteSchema<PartialEntity<Patient, "id">>> = yup.object({
    params: yup
        .object({
            id: yup
                .number()
                .integer()
                .required("Deve ser passado um id.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .noUnknown(true)
});

export type ReqCreatePatient = InferType<typeof createPatient>;
export type ReqQueryPatient = InferType<typeof queryPatient>;
export type ReqGetPatient = InferType<typeof getPatient>;
export type ReqUpdatePatient = InferType<typeof updatePatient>;
export type ReqDeletePatient = InferType<typeof deletePatient>;

export default {
    createPatient,
    queryPatient,
    getPatient,
    updatePatient,
    deletePatient,
};
