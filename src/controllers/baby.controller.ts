import httpStatus from "http-status";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { babyService } from "../services";
import { ReqCreateBabyInfo, ReqQueryBabyInfo, ReqGetBabyInfo } from "../validations/baby.validation";

const createBabyInfo = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateBabyInfo;
    const { data: babyInfo } = validRequest.body;

    const babyInfosCriados = await babyService.createBabyInfo(babyInfo);

    res.status(httpStatus.CREATED).send(babyInfosCriados);
});

const queryBabyInfo = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryBabyInfo;
    const babyInfos = await babyService.queryBabyInfo(validRequest.query);
    res.send(babyInfos);
});

const getBabyInfoById = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqGetBabyInfo;

    const babyInfo = await babyService.getBabyInfoById(validRequest.params.id);
    if (!babyInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, "BabyInfo not found");
    }
    res.send(babyInfo);
});

export default {
    createBabyInfo,
    queryBabyInfo,
    getBabyInfoById,
}
