import httpStatus from "../utils/httpStatus";
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { projectService } from "../services";
import {
    ReqQueryProjectVideoType,
    ReqQueryProject,
    ReqQueryMovesInfo,
    ReqQueryEventsResults,
    ReqCreateProject,
    ReqUpdateProject,
    ReqCreateProjectVideoType,
    ReqUpdateProjectVideoType,
    ReqGetProjectVideoType,
    ReqDeleteProjectVideoType,
    ReqCreateMoveInfo,
    ReqUpdateMoveInfo,
    ReqDeleteMoveInfo,
} from "../validations/project.validation";

//!PROJECT
const createProject = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateProject;
    const { data: project } = validRequest.body;
    const projectCriado = await projectService.createProject(project);
    res.status(httpStatus.CREATED).send(projectCriado);
});
const queryProject = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryProject;
    const project = await projectService.queryProject(validRequest.query);
    res.send(project);
});
const getProjectById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const project = await projectService.getProjectById(Number(id));
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, "Projeto não encontrado.");
    }
    res.send(project);
});
const updateProject = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqUpdateProject;
    const id = Number(validRequest.params.id);

    const dadosProject = { id, ...validRequest.body.data };
    const project = await projectService.updateProject(dadosProject);
    res.send(project);
});
const deleteProject = catchAsync(async (req, res) => {
    const { id } = req.params;
    await projectService.deleteProject(Number(id));
    res.status(httpStatus.NO_CONTENT).send();
});

//!PROJECT VIDEO TYPE
const createProjectVideoType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateProjectVideoType;
    const { data: projectVideoType } = validRequest.body;
    const projectVideoTypeCreated = await projectService.createProjectVideoType(projectVideoType);
    res.status(httpStatus.CREATED).send(projectVideoTypeCreated);
})
const queryProjectVideoType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryProjectVideoType;
    const { projectId } = req.params;
    const projectVideoTypes = await projectService.queryProjectVideoType(Number(projectId), validRequest.query);
    res.send(projectVideoTypes);
});
const getProjectVideoTypeById = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqGetProjectVideoType;
    const { id } = validRequest.params;
    const projectVideoType = await projectService.getProjectVideoTypeById(Number(id));
    res.send(projectVideoType);
})
const updateProjectVideoType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqUpdateProjectVideoType;
    const id = Number(validRequest.params.id);

    const dadosProjectVideoType = { id, ...validRequest.body.data };
    const projectVideoType = await projectService.updateProjectVideoType(dadosProjectVideoType);
    res.send(projectVideoType);
});
const deleteProjectVideoType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqDeleteProjectVideoType;
    const { id } = validRequest.params;
    await projectService.deleteProjectVideoType(Number(id));
    res.status(httpStatus.NO_CONTENT).send();
})

//!MOVES INFO
const createMovesInfo = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateMoveInfo;
    const { data: movesInfo } = validRequest.body;
    const projectId = Number(validRequest.params.projectId);
    const movesInfoCriado = await projectService.createMovesInfo(projectId, movesInfo);
    res.status(httpStatus.CREATED).send(movesInfoCriado);
});
const queryMovesInfo = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryMovesInfo;
    const { projectId } = req.params;
    const moves = await projectService.queryMovesInfo(Number(projectId), validRequest.query);
    res.send(moves);
});
const getMoveInfoById = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateMoveInfo;
    const id  = validRequest.params;
    const move = await projectService.getMoveInfoById(Number(id));
    res.send(move);
})

const updateMoveInfo = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqUpdateMoveInfo;
    const id = Number(validRequest.params.id);

    const dadosMoveInfo = { id, ...validRequest.body.data };
    const move = await projectService.updateMoveInfo(dadosMoveInfo);
    res.send(move);
})

const deleteMoveInfo = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqDeleteMoveInfo;
    const { id } = validRequest.params;
    await projectService.deleteMoveInfo(Number(id));
    res.status(httpStatus.NO_CONTENT).send();
})

const queryEventsResults = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqQueryEventsResults;
    const { projectId } = req.params;
    const events = await projectService.queryEventsResults(Number(projectId), validRequest.query);
    res.send(events);
});

export default {
    createProject,
    queryProject,
    getProjectById,
    updateProject,
    deleteProject,

    createProjectVideoType,
    queryProjectVideoType,
    getProjectVideoTypeById,
    updateProjectVideoType,
    deleteProjectVideoType,

    createMovesInfo,
    queryMovesInfo,
    getMoveInfoById,
    updateMoveInfo,
    deleteMoveInfo,
    
    queryEventsResults,
};
