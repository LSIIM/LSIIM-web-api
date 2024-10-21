import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import httpStatus from '../utils/httpStatus'
import { User, TokenType, Token } from "@prisma/client";
import ApiError from "../utils/apiError";
import prisma from "../client";
import { AuthTokensResponse } from "../types/response";
import config from "../config/config";
import userService from "./user.service";

const generateToken = (_payload: { userId: number; expires: Moment; type: TokenType }): string => {
    const payload = {
        sub: _payload.userId,
        iat: moment().unix(),
        exp: _payload.expires.unix(),
        type: _payload.type,
    };
    return jwt.sign(payload, config.jwt.secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {number} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */

const saveToken = async (
    token: string,
    userId: number,
    expires: Moment,
    type: TokenType,
    blacklisted = false
): Promise<Token> => {
    const tokenCreation = await prisma.token.create({
        data: {
            token,
            userId: userId,
            expires: expires.toDate(),
            type,
            blacklisted,
        },
    });
    return tokenCreation;
};

/**
 * Generate auth tokens
 * @param {string} userId
 * @returns {Promise<AuthTokensResponse>}
 */

const generateAuthTokens = async (user: { id: number }): Promise<AuthTokensResponse> => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, "minutes");
    const accessTokem = generateToken({ userId: user.id, expires: accessTokenExpires, type: TokenType.ACCESS });

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, "days");
    const refreshToken = generateToken({ userId: user.id, expires: refreshTokenExpires, type: TokenType.REFRESH });

    await saveToken(accessTokem, user.id, accessTokenExpires, TokenType.ACCESS);
    await saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.REFRESH);

    return {
        access: {
            token: accessTokem,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};
/**
 *
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */

const verifyToken = async (token: string, type: TokenType): Promise<Token> => {
    const payload = jwt.verify(token, config.jwt.secret);
    const userId = Number(payload.sub);
    const tokenDoc = await prisma.token.findFirst({
        where: {
            token,
            userId,
            type,
            expires: { gte: new Date() },
            blacklisted: false,
        },
    });
    if (!tokenDoc) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Token not found");
    }
    return tokenDoc;
};
/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */

const generateResetPasswordToken = async (email: string): Promise<string> => {
    const user = await userService.getUserByEmail(email);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Nenhum usuário encontrado com esse email.");

    const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, "minutes");
    const resetPasswordToken = generateToken({ userId: user.id, expires, type: TokenType.RESET_PASSWORD });
    await saveToken(resetPasswordToken, user.id, expires, TokenType.RESET_PASSWORD);
    return resetPasswordToken;
};


export default {
    generateToken,
    saveToken,
    generateAuthTokens,
    verifyToken,
    generateResetPasswordToken,
};