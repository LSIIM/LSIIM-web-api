import httpStatus from "http-status";
import tokenService from "./token.service";
import userService from "./user.service";
import ApiError from "../utils/apiError";
import { User, TokenType } from "@prisma/client";
import prisma from "../prisma/prisma";
import { encryptPassword, isPasswordMatch } from "../utils/encryption";
import { AuthTokensResponse, PartialEntity, tNovoUser } from "../types/response";
import exclude from "../utils/exclude";

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Omit<User, 'password'>>}
 */

const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<Omit<User, "password">> => {
    const user = await userService.getUserByEmail(email, [
        "id",
        "name",
        "email",
        "role",
        "cpf",
        "createdAt",
        "updatedAt",
        "password",
    ]);
    
    if (!user || !(await isPasswordMatch(password, user.password as string)))
        throw new ApiError(httpStatus.UNAUTHORIZED, "Usuário não encontrado");

    return exclude(user, ["password"]);
};
/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<AuthTokensResponse>}
 */

const refreshAuth = async (refreshToken: string): Promise<AuthTokensResponse> => {
    try {
        const refreshTokenData = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);
        const { userId } = refreshTokenData;

        await prisma.token.delete({ where: { id: refreshTokenData.id } });
        return tokenService.generateAuthTokens({ id: userId });
    } catch (err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Por favor, autentique!");
    }
};
/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */

const logout = async ({ refreshToken, accessToken }: { refreshToken: string; accessToken: string }): Promise<void> => {
    const refreshTokenData = await prisma.token.findFirst({
        where: { token: refreshToken, type: TokenType.REFRESH, blacklisted: false },
    });
    const accessTokenData = await prisma.token.findFirst({
        where: { token: accessToken, type: TokenType.ACCESS, blacklisted: false },
    });

    if (!refreshTokenData || !accessTokenData) {
        throw new ApiError(httpStatus.NOT_FOUND, "Token não encontrado.");
    }
    const batch = await prisma.token.deleteMany({ where: { id: { in: [refreshTokenData.id, accessTokenData.id] } } });
};

export default {
    loginUserWithEmailAndPassword,
    refreshAuth,
    logout,
};