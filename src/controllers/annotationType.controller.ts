import httpStatus from '../utils/httpStatus'
import ApiError from "../utils/apiError";
import catchAsync from "../utils/catchAsync";
import { annotationTypeService } from "../services";
import { ReqCreateAnnotationType } from "../validations/annotationType.validation";

const createAnnotationType = catchAsync(async (req, res) => {
    const validRequest = req as unknown as ReqCreateAnnotationType;
    const {data: annotationType} = validRequest.body;

    const annotationTypeCriado = await annotationTypeService.createAnnotationType(annotationType);
    res.status(httpStatus.CREATED).send(annotationTypeCriado);
});

export default {
    createAnnotationType,
}