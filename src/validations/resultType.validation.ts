import { ResultType } from "@prisma/client";
import yup from "../config/yup";
import {
    tNovoResultType,
    PartialEntity,
    tValidCreateSchema,
    tValidDeleteSchema,
    tValidParamsSchema,
    tValidQuerySchema,
    tValidUpdateSchema,
} from "../types/response";
import { InferType } from "yup";

const createResultType: yup.ObjectSchema<tValidCreateSchema<tNovoResultType>> = yup.object({
    body: yup
        .object({
            data: yup
                .array(
                    yup
                        .object({
                            name: yup.string().required("Deve ser passado um name."),
                            description: yup.string().required("Deve ser passado um description."),
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

const queryResultType: yup.ObjectSchema<
    tValidQuerySchema<PartialEntity<ResultType, "name">, PartialEntity<ResultType, "id" | "createdAt">>
> = yup.object({
    query: yup
        .object({
            sortBy: yup.mixed<"id" | "createdAt">().oneOf(["id"]),
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

const getResultTypeById: yup.ObjectSchema<tValidParamsSchema<PartialEntity<ResultType, "id">>> = yup.object({
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

export type ReqCreateResultType = InferType<typeof createResultType>;
export type ReqQueryResultType = InferType<typeof queryResultType>;
export type ReqGetResultType = InferType<typeof getResultTypeById>;

export default { createResultType, queryResultType, getResultTypeById };
