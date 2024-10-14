
//SUBJECTS
export type tSubjects = | "Recording" | "User" | "BabyInfo"

export const fnSubjects = (subject: tSubjects, params?: {}) => ({__typename: subject, ...params});