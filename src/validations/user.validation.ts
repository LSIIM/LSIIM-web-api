import { Role, User } from "@prisma/client";
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
                            cpf: yup.string().required(),
                            role: yup.string().oneOf(Object.values(Role)).required("Deve ser passado um role."),
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

const queryUsers: yup.ObjectSchema<tValidQuerySchema<PartialEntity<User, "role">, PartialEntity<User, "name">>> =
    yup.object({
        query: yup
            .object({
                sortBy: yup.mixed<"name">().oneOf(["name"]),
                sortType: yup.mixed<"asc" | "desc">().oneOf(["asc", "desc"]),
                limit: yup.number().integer("O limit deve ser um número inteiro."),
                page: yup.number().integer("O page deve ser um número inteiro."),
                where: yup
                    .object({
                        role: yup.string().oneOf(Object.values(Role)),
                    })
                    .noUnknown(true)
                    .strict(),
            })
            .noUnknown(true)
            .strict(),
    });

//TYPES
export type ReqCreateUser = InferType<typeof createUser>;
export type ReqQueryUser = InferType<typeof queryUsers>;

export default {
    createUser,
    queryUsers,
};
