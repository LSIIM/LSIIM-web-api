import { BabyInfo } from "@prisma/client";
import yup from "../config/yup";
import {
    tNovoBabyInfo,
    PartialEntity,
    tValidCreateSchema,
    tValidDeleteSchema,
    tValidParamsSchema,
    tValidQuerySchema,
    tValidUpdateSchema,
} from "../types/response";
import { InferType } from "yup";

const createBabyInfo: yup.ObjectSchema<tValidCreateSchema<tNovoBabyInfo>> = yup.object({
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
                            isPremature: yup.boolean().required("Deve ser passado se é prematuro."),
                            gestationalAge: yup.number().required("Deve ser passado a idade gestacional(semanas)."),
                            atipicidade: yup.string(),
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

const queryBabyInfo: yup.ObjectSchema<
    tValidQuerySchema<PartialEntity<BabyInfo, "name">, PartialEntity<BabyInfo, "name" | "createdAt">>
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

const getBabyInfo: yup.ObjectSchema<tValidParamsSchema<PartialEntity<BabyInfo, "id">>> = yup.object({
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

export type ReqCreateBabyInfo = InferType<typeof createBabyInfo>;
export type ReqQueryBabyInfo = InferType<typeof queryBabyInfo>;
export type ReqGetBabyInfo = InferType<typeof getBabyInfo>;

export default {
    createBabyInfo,
    queryBabyInfo,
    getBabyInfo,
};
