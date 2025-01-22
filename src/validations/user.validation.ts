import { User } from "@prisma/client";
import yup from "../config/yup";
import {
    PartialEntity,
    tNovoUser,
    tValidCreateSchema,
    tValidDeleteSchema,
    tValidParamsSchema,
    tValidQuerySchema,
    tValidUpdateSchema,
} from "../types/response";
import { InferType } from "yup";
import { query } from "express";

//VALIDATIONS
const createUser: yup.ObjectSchema<tValidCreateSchema<tNovoUser>> = yup.object({
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
                            email: yup.string().email("Insira um email válido").required("O email é obrigatório."),
                            password: yup.string().default(""),
                            documento: yup.string().required(),
                            isSysAdmin: yup.boolean().required("Deve ser passado um valor para isSysAdmin."),
                            userProjects: yup
                                .object({
                                    projectId: yup.number().required("Deve ser passado um projectId."),
                                    isProjectAdmin: yup
                                        .boolean()
                                        .required("Deve ser passado um valor para isProjectAdmin."),
                                })
                                .noUnknown(true)
                                .strict(),
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

const queryUsers: yup.ObjectSchema<tValidQuerySchema<PartialEntity<User, "name">, PartialEntity<User, "name">>> =
    yup.object({
        query: yup
            .object({
                sortBy: yup.mixed<"name">().oneOf(["name"]),
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

const getUserById: yup.ObjectSchema<tValidParamsSchema<PartialEntity<User, "id">>> = yup.object({
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
const updateUser: yup.ObjectSchema<tValidUpdateSchema<PartialEntity<User, "id">, tNovoUser>> = yup.object({
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
                    email: yup.string().email("Insira um email válido").required("O email é obrigatório."),
                    password: yup.string().default(""),
                    documento: yup.string().required(),
                    isSysAdmin: yup.boolean().required("Deve ser passado um valor para isSysAdmin."),
                    userProjects: yup
                        .object({
                            projectId: yup.number().required("Deve ser passado um projectId."),
                            isProjectAdmin: yup.boolean().required("Deve ser passado um valor para isProjectAdmin."),
                        })
                        .noUnknown(true)
                        .strict(),
                })
                .noUnknown(true)
                .strict(),
        })
        .required("Deve ser passado um body.")
        .noUnknown(true)
        .strict(),
});

const deleteUser: yup.ObjectSchema<tValidDeleteSchema<PartialEntity<User, "id">>> = yup.object({
    params: yup.object({
        id: yup
            .number()
            .integer()
            .required("Deve ser passado um id.")
            .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
    }),
});

//TYPES
export type ReqCreateUser = InferType<typeof createUser>;
export type ReqQueryUser = InferType<typeof queryUsers>;
export type ReqGetUserById = InferType<typeof getUserById>;
export type ReqUpdateUser = InferType<typeof updateUser>;
export type ReqDeleteUser = InferType<typeof deleteUser>;

export default {
    createUser,
    queryUsers,
    getUserById,
    updateUser,
    deleteUser,
};
