import { createMongoAbility, AbilityBuilder, MongoAbility } from "@casl/ability";
import { AnnotationVideo, EventTypeProject, MoveInfo, Patient, PatientProject, Project, ProjectVideoType, Recording, User, UserProject } from "@prisma/client";
export type Actions = "manage" | "create" | "read" | "update" | "delete";
import { PartialEntity } from "@src/types/response";

export type Subjects =
    | "User"
    | "Patient"
    | "Recording"
    | "EventType"
    | "EventTypeProject"
    | "Annotation"
    | "ResultTypeOption"
    | "Result"
    | "AnnotationVideo"
    | "AnnotationEvent"
    | "AnnotationResult"
    | "RecordingVideo"
    | "PatientProjectSpecialFeature"
    | "Project"
    | "ResultType"
    | "ResultTypeProject"
    | "ProjectVideoType"
    | "MoveInfo"
    | "UserProject"
    | "CamInfo"
    | "CamInfoProject"
    | "all";

export const fnSubject = (subject: Subjects, params?: {}) => ({ __typename: subject, ...params });
export type objSubject = User;
export type AppAbility = MongoAbility<[Actions, Subjects | objSubject | { __typename: Subjects }]>;

export function defineAbilitiesFor(user: {
    isSysAdmin: Boolean;
    id: string;
    userProject?: PartialEntity<UserProject, "id" | "userId" | "projectId" | "isProjectAdmin"> | null;
}): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.isSysAdmin === true) {
        can("manage", "all");
    }

    if (user.userProject?.isProjectAdmin === true) {
        if (user.userProject) {
            //CREATE
            can<MoveInfo>("create", "MoveInfo", { projectId: user.userProject.projectId });
            can<ProjectVideoType>("create", "ProjectVideoType", { projectId: user.userProject.projectId });
            can<Recording>("create", "Recording", { projectId: user.userProject.projectId });

            //READ
            can<Project>("read", "Project", { id: user.userProject.projectId });
            can<MoveInfo>("read", "MoveInfo", { projectId: user.userProject.projectId });
            can<ProjectVideoType>("read", "ProjectVideoType", { projectId: user.userProject.projectId });
            can<Recording>("read", "Recording", { projectId: user.userProject.projectId });
            can<PatientProject>("read", "Patient", { projectId: user.userProject.projectId });

            //UPDATE
            can<Project>("update", "Project", { id: user.userProject.projectId });
            can<MoveInfo>("update", "MoveInfo", { projectId: user.userProject.projectId });
            can<ProjectVideoType>("update", "ProjectVideoType", { projectId: user.userProject.projectId });
            can<Recording>("update", "Recording", { projectId: user.userProject.projectId });
        }
    }

    if(user.userProject?.isProjectAdmin === false){
        if(user.userProject){
            //CREATE
            can<Recording>("create", "Recording", { projectId: user.userProject.projectId });
            can<AnnotationVideo>("create", "AnnotationVideo");

            //READ
            can<Project>("read", "Project", { id: user.userProject.projectId });
            can<MoveInfo>("read", "MoveInfo", { projectId: user.userProject.projectId });
            can<ProjectVideoType>("read", "ProjectVideoType", { projectId: user.userProject.projectId });
            can<Recording>("read", "Recording", { projectId: user.userProject.projectId });
            can<PatientProject>("read", "Patient", { projectId: user.userProject.projectId });
            can<AnnotationVideo>("read", "AnnotationVideo");

            //UPDATE
            can<Recording>("update", "Recording", { projectId: user.userProject.projectId });
            can<AnnotationVideo>("update", "AnnotationVideo");
        }
    }
    return build({ detectSubjectType: (object: any) => object.__typename });
}
