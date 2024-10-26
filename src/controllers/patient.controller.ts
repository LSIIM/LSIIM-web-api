import httpStatus from "../utils/httpStatus";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { patientService } from "../services";
import { ReqCreatePatient, ReqGetPatient, ReqQueryPatient } from "../validations/patient.validation";

const createPatient = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreatePatient;
    const { data: babyInfo } = validRequest.body;

    const babyInfosCriados = await patientService.createPatient(babyInfo);

    res.status(httpStatus.CREATED).send(babyInfosCriados);
});

const queryPatient = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryPatient;

    const babyInfos = await patientService.queryPatient(validRequest.query);
    res.send(babyInfos);
});

const getPatient = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqGetPatient;
    const babyInfo = await patientService.getPatientById(validRequest.params.id);
    if (!babyInfo) throw new ApiError(httpStatus.NOT_FOUND, "BabyInfo not found");

    res.send(babyInfo);
});

export default {
    createPatient,
    queryPatient,
    getPatient,
};
