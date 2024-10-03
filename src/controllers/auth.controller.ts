import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { authService, tokenService } from "../services";
import {
    ReqLogin,
    ReqLogout,
    ReqRefreshToken,
} from "../validations/auth.validation";

const login = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqLogin;
    const { email, password } = validRequest.body
    ;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqLogout;
    const { refreshToken, accessToken } = validRequest.body;
    await authService.logout({ refreshToken, accessToken });
    res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqRefreshToken;
    const { refreshToken } = validRequest.body;
    const tokens = await authService.refreshAuth(refreshToken);
    res.send({ ...tokens });
});

export default {
    login,
    logout,
    refreshTokens,
};