import { ResultTypeOptions } from "@prisma/client";
import yup from "../config/yup";
import {
    tNovoResultsTypeOptions,
    PartialEntity,
    tValidCreateSchema,
    tValidDeleteSchema,
    tValidParamsSchema,
    tValidQuerySchema,
    tValidUpdateSchema,
} from "../types/response";
import { InferType } from "yup";

const createResultTypeOptions: yup.ObjectSchema<tValidCreateSchema<tNovoResultsTypeOptions>> = yup.object({
    body: yup
        .object({
            data: yup
                .array(
                    yup
                        .object({
                            name: yup.string().required("Deve ser passado um name."),
                            description: yup.string().required("Deve ser passado um description."),
                            resultTypeId: yup.number().required("Deve ser passado um resultTypeId."),
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

const queryResultTypeOptions: yup.ObjectSchema<
    tValidQuerySchema<PartialEntity<ResultTypeOptions, "name">, PartialEntity<ResultTypeOptions, "id" | "createdAt">>
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

const getResultTypeOptionsById: yup.ObjectSchema<tValidParamsSchema<PartialEntity<ResultTypeOptions, "id">>> =
    yup.object({
        params: yup
            .object({
                id: yup.number().integer().required("Deve ser passado um id."),
            })
            .noUnknown(true)
            .strict(),
    });

export type ReqCreateResultTypeOptions = InferType<typeof createResultTypeOptions>;
export type ReqQueryResultTypeOptions = InferType<typeof queryResultTypeOptions>;
export type ReqGetResultTypeOptions = InferType<typeof getResultTypeOptionsById>;

export default { createResultTypeOptions, queryResultTypeOptions, getResultTypeOptionsById };
