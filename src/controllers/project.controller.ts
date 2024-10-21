import httpStatus from './utils/httpStatus';
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { projectService } from "../services";
import { ReqQueryProjectVideoType, ReqQueryProject, ReqQueryMovesInfo } from "../validations/project.validation";

const queryProject = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryProject;
    const project = await projectService.queryProject(validRequest.query);
    res.send(project);
});

const queryProjectVideoType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryProjectVideoType;
    const { projectId } = req.params;
    const projectVideoTypes = await projectService.queryProjectVideoType(Number(projectId), validRequest.query);
    res.send(projectVideoTypes);
});

const queryMovesInfo = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryMovesInfo;
    const { projectId } = req.params;
    const moves = await projectService.queryMovesInfo(Number(projectId), validRequest.query);
    res.send(moves);
});

export default {
    queryMovesInfo,
    queryProjectVideoType,
    queryProject,
};
