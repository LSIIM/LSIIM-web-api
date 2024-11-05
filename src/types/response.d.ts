import {
    User,
    Patient,
    Recording,
    EventType,
    Annotation,
    ResultTypeOptions,
    Result,
    AnnotationVideo,
    AnnotationEvent,
    AnnotationResult,
    RecordingVideo,
    PatientProjectSpecialFeature,
    Project,
} from "@prisma/client";

export interface TokenResponse {
    token: string;
    expires: Date;
}

export interface AuthTokensResponse {
    access: TokenResponse;
    refresh?: TokenResponse;
}
//TIPOS DERIVADOS
//ANNOTATION VIDEO
export type tNovoAnnotationVideo = PartialEntity<AnnotationVideo, "recordingVideoId"> & {
    comment?: string;
    events: tNovoAnnotationEvent[];
    results?: tNovoAnnotationResults[];
};
//ECENT TYPE
export type tNovoEventType = PartialEntity<EventType, "name" | "description" | "isTemporal">;

//ANNOTATION EVENT
export type tNovoAnnotationEvent = PartialEntity<AnnotationEvent, "eventTypeId" | "frames">;

//USER
export type tNovoUser = PartialEntity<User, "name" | "email" | "password" | "documento" | "role">;

//Patient
export type tNovoPatient = PartialEntity<Patient, "name" | "birthDate" | "isPremature" | "gestationalAge"> & {
    patientSpecialFeatures: tNovoPatientProjectSF[];
};
export type tNovoProject = PartialEntity<Project, "projectName" | "description" | "patientSpecialFetauresTemplate">;

export type tNovoPatientSpecialFeatures = PartialEntity<
    PatientProjectSpecialFeature,
    "specialFeatureTemplate" | "projectId"
>;
//RESULTS
export type tNovoAnnotationResults = PartialEntity<AnnotationResult, "resultTypeId" | "resultTypeOptionId"> & {
    scalarResult?: number;
};

export type tNovoAnnResult = { events: tNovoAnnotationVideo[]; results?: tNovoAnnotationResults[] };

//RESULTYPE
export type tNovoResultType = PartialEntity<ResultTypeOptions, "name" | "description">;

//RESULTTYPEOPTIONS
export type tNovoResultsTypeOptions = PartialEntity<ResultTypeOptions, "name" | "description" | "resultTypeId">;
//RECORDING
export type tNovoRecording = PartialEntity<
    Recording,
    "ignore" | "observation" | "patientId" | "recordingDate" | "moveId" | "projectId"
> & { recordingsVideos: tNovoRecordingVideo[] };

export type tNovoRecordingVideo = PartialEntiry<RecordingVideo, "projectVideoTypeId" | "camIdUsed">;

//TIPOS AUXILIARESj
export type PartialEntity<Entity, Keys extends keyof Entity> = {
    [Key in Keys]: Entity[Key];
};
export type tEntityOptional<Entity> = {
    [Key in keyof Entity]?: Entity[Key];
};

//TIPOS PARA REQUESTS PARAMS
export type tBodyParams<Entity> = {
    data: { [Key in keyof Entity]: Entity[Key] }[];
};

export type tUpdateBodyParams<Entity> = {
    data: { [Key in keyof Entity]: Entity[Key] };
};
export type tQueryParams<WhereEntity, SortEntity> = {
    sortBy?: keyof SortEntity;
    sortType?: "asc" | "desc";
    limit?: number;
    page?: number;
    where?: tEntityOptional<WhereEntity>;
};

//JOI VALIDATIONS SCHEMAS
export type tValidQuerySchema<WhereEntity, SortEntity> = {
    query: tQueryParams<WhereEntity, SortEntity>;
};
export type tValidCreateSchema<Entity> = { body: tBodyParams<Entity> };
export type tValidCustomCreate<Entity> = {
    body: { events: { [Key in keyof Entity]: Entity[Key] }[]; results: { [Key in keyof Entity]: Entity[Key] }[] };
};
export type tValidSimpleCreateSchema<EntityBody, EntityQuery = undefined> = EntityQuery extends undefined
    ? { body: EntityBody }
    : { body: EntityBody; query: EntityQuery };
export type tValidParamsSchema<Entity> = { params: { [Key in keyof Entity]: Entity[Key] } };
export type tValidDeleteSchema<Entity> = { params: { [Key in keyof Entity]: Entity[Key] } };
export type tValidUpdateSchema<EntityParams, EntityBody> = {
    params: { [Key in keyof EntityParams]: EntityParams[Key] };
    body: tUpdateBodyParams<EntityBody>;
};
