import httpStatus from "../utils/httpStatus";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { patientService } from "../services";
import {
    ReqCreatePatient,
    ReqGetPatient,
    ReqQueryPatient,
    ReqUpdatePatient,
    ReqDeletePatient,
} from "../validations/patient.validation";

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

const updatePatient = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqUpdatePatient;
    const dadosPatientInfo = { id: validRequest.params.id, ...validRequest.body.data };

    const babyInfo = await patientService.updatePatient(dadosPatientInfo);
    res.send(babyInfo);
});

const deletePatient = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqDeletePatient;
    const patientExists = await patientService.getPatientById(validRequest.params.id);
    if (!patientExists) throw new ApiError(httpStatus.NOT_FOUND, "Patient not found");

    await patientService.deletePatient(validRequest.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createPatient,
    queryPatient,
    getPatient,
    updatePatient,
    deletePatient,
};
