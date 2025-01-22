import {
    User,
    Patient,
    Recording,
    EventType,
    EventTypeProject,
    Annotation,
    ResultTypeOption,
    Result,
    AnnotationVideo,
    AnnotationEvent,
    AnnotationResult,
    RecordingVideo,
    PatientProjectSpecialFeature,
    Project,
    ResultType,
    ResultTypeProject,
    ProjectVideoType,
    MoveInfo,
    UserProject,
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
export type tNovoEventType = PartialEntity<EventType, "name" | "description" | "isTemporal"> & {
    eventsTypeProject: tNovoEventTypeProject[];
};

//EVENT TYPE PROJECT
export type tNovoEventTypeProject = PartialEntity<EventTypeProject, "projectId">;

//ANNOTATION EVENT
export type tNovoAnnotationEvent = PartialEntity<AnnotationEvent, "eventTypeId" | "frames">;

//MOVES INFO
export type tNovoMoveInfo = PartialEntity<MoveInfo, "description" | "defaultCamId">;
//USER
export type tNovoUser = PartialEntity<User, "name" | "email" | "password" | "documento" | "isSysAdmin"> & {
    userProjects?: tNovoUserProject;
};

//USERPROJECT
export type tNovoUserProject = PartialEntity<UserProject, "projectId" | "isProjectAdmin">;

//Patient
export type tNovoPatient = PartialEntity<Patient, "name" | "birthDate" | "observation"> & {
    projects: tNovoPatientProjectSpecialFeatures[];
};

export type tNovoPatientProjectSpecialFeatures = PartialEntity<PatientProjectSpecialFeature, "projectId"> & {
    patientSpecialFeatures: Prisma.JsonObject;
};

export type tNovoProject = PartialEntity<Project, "projectName" | "description"> & {
    patientSpecialFetauresTemplate: Prisma.JsonObject;
};
//RESULTS
export type tNovoAnnotationResults = PartialEntity<AnnotationResult, "resultTypeId" | "resultTypeOptionId"> & {
    scalarResult?: number;
};

export type tNovoAnnResult = { events: tNovoAnnotationVideo[]; results?: tNovoAnnotationResults[] };

//RESULTYPE
export type tNovoResultType = PartialEntity<ResultType, "name" | "description"> & {
    resultsTypeProject: tNovoResultTypeProject[];
};

export type tNovoResultTypeProject = PartialEntity<ResultTypeProject, "projectId">;

//RESULTTYPEOPTIONS
export type tNovoResultsTypeOptions = PartialEntity<ResultTypeOption, "name" | "description">;
//RECORDING
export type tNovoRecording = PartialEntity<
    Recording,
    "ignore" | "observation" | "patientId" | "recordingDate" | "moveId" | "projectId"
> & { recordingsVideos: tNovoRecordingVideo[] };

export type tNovoRecordingVideo = PartialEntiry<RecordingVideo, "projectVideoTypeId" | "camIdUsed"> & { file?: string };

//PROJECT VIDEO TYPE
export type tNovoProjectVideoType = PartialEntity<ProjectVideoType, "isMain" | "projectId" | "typeName">;

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
export type tValidCreateSchemaWithParams<EntityParams, EntityBody> = {
    params: { [Key in keyof EntityParams]: EntityParams[Key] };
    body: tBodyParams<EntityBody>;
};
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
