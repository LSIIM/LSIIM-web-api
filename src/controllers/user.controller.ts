import httpStatus from './utils/httpStatus';
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { userService } from "../services";
import { ReqCreateUser, ReqQueryUser } from "../validations/user.validation";

const createUser = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateUser;
    const {data: users} = validRequest.body;

    const user = await userService.createUsers(users);

    res.status(httpStatus.CREATED).send(user);
});

const queryUsers = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryUser;
    const users = await userService.queryUsers(validRequest.query);
    res.send(users);
});

export default {
    createUser,
    queryUsers,
};