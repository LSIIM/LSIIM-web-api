import { ResultTypeOption } from "@prisma/client";
import yup from "../config/yup";
import {
    tNovoResultsTypeOptions,
    PartialEntity,
    tValidDeleteSchema,
    tValidParamsSchema,
    tValidQuerySchema,
    tValidUpdateSchema,
    tValidCreateSchemaWithParams,
} from "../types/response";
import { InferType } from "yup";

const createResultTypeOptions: yup.ObjectSchema<
    tValidCreateSchemaWithParams<PartialEntity<ResultTypeOption, "resultTypeId">, tNovoResultsTypeOptions>
> = yup.object({
    params: yup
        .object({
            resultTypeId: yup
                .number()
                .integer()
                .required("Deve ser passado um resultTypeId.")
                .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
        })
        .noUnknown(true),
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

const queryResultTypeOptions: yup.ObjectSchema<
    tValidQuerySchema<PartialEntity<ResultTypeOption, "name">, PartialEntity<ResultTypeOption, "id" | "createdAt">>
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

const getResultTypeOptionsById: yup.ObjectSchema<tValidParamsSchema<PartialEntity<ResultTypeOption, "id">>> =
    yup.object({
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

const updateResultTypeOptions: yup.ObjectSchema<
    tValidUpdateSchema<PartialEntity<ResultTypeOption, "id">, tNovoResultsTypeOptions>
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
                    name: yup.string().required("Deve ser passado um name."),
                    description: yup.string().required("Deve ser passado um description."),
                })
                .noUnknown(true)
                .strict(),
        })
        .noUnknown(true)
        .strict(),
});

const deleteResultTypeOptions: yup.ObjectSchema<tValidDeleteSchema<PartialEntity<ResultTypeOption, "id">>> = yup.object(
    {
        params: yup
            .object({
                id: yup
                    .number()
                    .integer()
                    .required("Deve ser passado um id.")
                    .transform((value) => (typeof value === "string" ? parseInt(value) : value)),
            })
            .noUnknown(true),
    }
);

export type ReqCreateResultTypeOptions = InferType<typeof createResultTypeOptions>;
export type ReqQueryResultTypeOptions = InferType<typeof queryResultTypeOptions>;
export type ReqGetResultTypeOptions = InferType<typeof getResultTypeOptionsById>;
export type ReqUpdateResultTypeOptions = InferType<typeof updateResultTypeOptions>;
export type ReqDeleteResultTypeOptions = InferType<typeof deleteResultTypeOptions>;

export default {
    createResultTypeOptions,
    queryResultTypeOptions,
    getResultTypeOptionsById,
    updateResultTypeOptions,
    deleteResultTypeOptions,
};
