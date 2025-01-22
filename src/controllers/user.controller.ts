import httpStatus from "../utils/httpStatus";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { userService } from "../services";
import {
    ReqCreateUser,
    ReqQueryUser,
    ReqGetUserById,
    ReqUpdateUser,
    ReqDeleteUser,
} from "../validations/user.validation";

const createUser = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateUser;
    const { data: users } = validRequest.body;

    const user = await userService.createUsers(users);

    res.status(httpStatus.CREATED).send(user);
});

const queryUsers = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryUser;
    const users = await userService.queryUsers(validRequest.query);
    res.send(users);
});

const getUserById = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqGetUserById;
    const { id } = validRequest.params;
    const user = await userService.getUserById(Number(id));
    res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqUpdateUser;
    const dadosUser = { id: validRequest.params.id, ...validRequest.body.data };
    const user = await userService.updateUserById(dadosUser);
    res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqDeleteUser;
    const { id } = validRequest.params;
    await userService.deleteUseById(Number(id));
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createUser,
    queryUsers,
    getUserById,
    updateUser,
    deleteUser,
};
