import httpStatus from "http-status";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { projectService } from "../services";
import { ReqQueryProjectVideoType, ReqQueryProject } from "../validations/project.validation";

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

export default {
    queryProjectVideoType,
    queryProject,
};
