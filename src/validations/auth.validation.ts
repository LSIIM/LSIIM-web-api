import { User } from "@prisma/client";
import yup from "../config/yup";
import { PartialEntity, tValidSimpleCreateSchema } from "../types/response";
import { InferType } from "yup";

const login: yup.ObjectSchema<tValidSimpleCreateSchema<PartialEntity<User, "email" | "password">>> = yup.object({
    body: yup
        .object({
            email: yup.string().email("Insira um e-mail válido.").required("Deve ser passado um e-mail."),
            password: yup.string().required("Deve ser passado um password."),
        })
        .required("Deve ser passado um body")
        .noUnknown(true)
        .strict(),
});
const logout: yup.ObjectSchema<tValidSimpleCreateSchema<{ refreshToken: string; accessToken: string }>> = yup.object({
    body: yup
        .object({
            accessToken: yup.string().required("Deve ser passado um accessToken"),
            refreshToken: yup.string().required("Deve ser passado um refreshToken"),
        })
        .required("Deve ser passado um body")
        .noUnknown(true)
        .strict(),
});

const refreshTokens: yup.ObjectSchema<tValidSimpleCreateSchema<{ refreshToken: string }>> = yup.object({
    body: yup
        .object({
            refreshToken: yup.string().required("Deve ser passado um refresh token."),
        })
        .required("Deve ser passado um body")
        .noUnknown(true)
        .strict(),
});
//TYPES
export type ReqLogin = InferType<typeof login>;
export type ReqLogout = InferType<typeof logout>;
export type ReqRefreshToken = InferType<typeof refreshTokens>;

export default {
    login,
    logout,
    refreshTokens,
}