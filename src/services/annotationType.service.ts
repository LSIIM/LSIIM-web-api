import { AnnotationType } from ".prisma/client";
import { PartialEntity, tNovoAnnotationType } from "../types/response";
import httpStatus from '../utils/httpStatus'
import prisma from "../client";
import ApiError from "../utils/apiError";
import { InferType } from "yup";

const createAnnotationType = async (annotationType: tNovoAnnotationType[]): Promise<AnnotationType[]> => {
    const _annotationType = prisma.annotationType.createManyAndReturn({
        data: annotationType,
    });

    const [annotationTypeCriado] = await prisma.$transaction([_annotationType]);
    return annotationTypeCriado;
};


export default {
    createAnnotationType,
};
