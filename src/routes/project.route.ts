import express from "express";
import auth from "../middlewares/auth";
import { yupValidate } from "../middlewares/validate";
import projectValidation from "../validations/project.validation";
import { projectController } from "../controllers";

const router = express.Router();
//!PROJECT
router
    .route("/")
    .post(yupValidate(projectValidation.createProject), (req, res, next) => {
        try {
            projectController.createProject(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .get(yupValidate(projectValidation.queryProject), (req, res, next) => {
        try {
            projectController.queryProject(req, res, next);
        } catch (error) {
            next(error);
        }
    });
router
    .route("/:id")
    .get(yupValidate(projectValidation.queryProject), (req, res, next) => {
        try {
            projectController.getProjectById(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .patch(yupValidate(projectValidation.updateProject), (req, res, next) => {
        try {
            projectController.updateProject(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .delete(yupValidate(projectValidation.deleteProject), (req, res, next) => {
        try {
            projectController.deleteProject(req, res, next);
        } catch (error) {
            next(error);
        }
    });

//!PROJECT VIDEO TYPE
router.route("/videoType").post(yupValidate(projectValidation.createProjectVideoType), (req, res, next) => {
    try {
        projectController.createProjectVideoType(req, res, next);
    } catch (error) {
        next(error);
    }
});
router.route("/:projectId/videoType").get(yupValidate(projectValidation.queryProjectVideoType), (req, res, next) => {
    try {
        projectController.queryProjectVideoType(req, res, next);
    } catch (error) {
        next(error);
    }
});
router
    .route("/videoType/:id")
    .get(yupValidate(projectValidation.getProjectVideoType), (req, res, next) => {
        try {
            projectController.getProjectVideoTypeById(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .patch(yupValidate(projectValidation.updateProjectVideoType), (req, res, next) => {
        try {
            projectController.updateProjectVideoType(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .delete(yupValidate(projectValidation.deleteProjectVideoType), (req, res, next) => {
        try {
            projectController.deleteProjectVideoType(req, res, next);
        } catch (error) {
            next(error);
        }
    });

//!MOVES INFO
router
    .route("/:projectId/moves")
    .post(yupValidate(projectValidation.createMoveInfo), (req, res, next) => {
        try {
            projectController.createMovesInfo(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .get(yupValidate(projectValidation.queryMovesInfo), (req, res, next) => {
        try {
            projectController.queryMovesInfo(req, res, next);
        } catch (error) {
            next(error);
        }
    });
router
    .route("/moves/:id")
    .get(yupValidate(projectValidation.getMoveInfoById), (req, res, next) => {
        try {
            projectController.getMoveInfoById(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .patch(yupValidate(projectValidation.updateMoveInfo), (req, res, next) => {
        try {
            projectController.updateMoveInfo(req, res, next);
        } catch (error) {
            next(error);
        }
    })
    .delete(yupValidate(projectValidation.deleteMoveInfo), (req, res, next) => {
        try {
            projectController.deleteMoveInfo(req, res, next);
        } catch (error) {
            next(error);
        }
    });

router.route("/:projectId/camtype").get(yupValidate(projectValidation.queryProjectVideoType), (req, res, next) => {
    try {
        projectController.queryProjectVideoType(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.route("/:projectId/annotation_info").get(yupValidate(projectValidation.queryEventsResults), (req, res, next) => {
    try {
        projectController.queryEventsResults(req, res, next);
    } catch (error) {
        next(error);
    }
});
export default router;
