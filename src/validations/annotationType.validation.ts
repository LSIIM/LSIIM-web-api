import { AnnotationType } from "@prisma/client";
import { tNovoAnnotationType, PartialEntity, tValidCreateSchema } from "../types/response";
import yup from "../config/yup";
import { InferType } from "yup";

const createAnnotationType: yup.ObjectSchema<tValidCreateSchema<tNovoAnnotationType>> = yup.object({
    body: yup
        .object({
            data: yup
                .array(
                    yup
                        .object({
                            name: yup.string().required("O nome é obrigatório."),
                            descricao: yup.string().required("A descrição é obrigatória."),
                            isTemporal: yup.boolean().required("O campo isTemporal é obrigatório."),
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

export type ReqCreateAnnotationType= InferType<typeof createAnnotationType>;
export default {
    createAnnotationType,
};
