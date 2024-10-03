import {User} from "@prisma/client";



export interface TokenResponse {
    token: string;
    expires: Date;
}

export interface AuthTokensResponse {
    access: TokenResponse;
    refresh?: TokenResponse;
}

//TIPOS DERIVADOS
//USER
export type tNovoUser = PartialEntity<User, "name" | "email" | "password" | "cpf" | "role">;




//TIPOS AUXILIARES
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
export type tValidSimpleCreateSchema<EntityBody, EntityQuery = undefined> = EntityQuery extends undefined
    ? { body: EntityBody }
    : { body: EntityBody; query: EntityQuery };
export type tValidParamsSchema<Entity> = { params: { [Key in keyof Entity]: Entity[Key] } };
export type tValidDeleteSchema<Entity> = { params: { [Key in keyof Entity]: Entity[Key] } };
export type tValidUpdateSchema<EntityParams, EntityBody> = {
    params: { [Key in keyof EntityParams]: EntityParams[Key] };
    body: tUpdateBodyParams<EntityBody>;
};
