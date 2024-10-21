import { User, Role } from "@prisma/client";
import httpStatus from './utils/httpStatus';
import prisma from "../client";
import ApiError from "../utils/apiError";
import { encryptPassword } from "../utils/encryption";
import { PartialEntity, tNovoUser } from "../types/response";

/**
 * Criando usuários
 * @param {Object} newUsers => Usuários a serem criados
 * @returns {Promise<User[]>}
 */
const createUsers = async (newUsers: tNovoUser[]): Promise<User[]> => {
    //Verifica a existência de e-mais repetidos
    const userWithSameEmail = await prisma.user.findFirst({
        select: { id: true, email: true },
        where: { email: { in: newUsers.map(({ email }) => email) } },
    });
    if (userWithSameEmail) throw new ApiError(httpStatus.BAD_REQUEST, "E-mail já cadastrado");
    // Gera as senhas encriptadas antes da criação
    for (const user of newUsers) {
        if (!user.password) user.password = user.cpf; // Atribui o CPF à senha se estiver vazia

        user.password = await encryptPassword(user.password);
    }
    //TODO - não retornar senha
    const createUsers = prisma.user.createManyAndReturn({
        data: newUsers.map(({ name, email, password, cpf, role }) => ({
            name,
            email,
            password,
            cpf,
            role,
        })),
    });

    const [usuarioCriados] = await prisma.$transaction([createUsers]);

    return usuarioCriados;
};

/**
 * Query for users
 * @param {Object} query - Opções de busca
 * @param {string} [query.sortBy] - Organiza pelo paramêtro passado
 * @param {string} [query.sortType] - Tipo de organização ("asc" => crescente, "desc" => decrescente)
 * @param {number} [query.limit] - Limite de dados por páginas a serem buscados (default = 10)
 * @param {number} [query.page] - Página atual (default = 0)
 * @param {Object} [query.where] - Opções de where para usar no prisma
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async <Key extends keyof User>(
    query: { limit?: number; page?: number; sortBy?: Key; sortType?: "asc" | "desc"; where?: { role?: Role } },
    keys: Key[] = ["id", "name", "email", "role", "cpf", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<User, Key>[]> => {
    const limit = query.limit;
    const page = query.page;
    const sortBy = query.sortBy ?? "role";
    const sortType = query.sortType ?? "asc";

    const users = await prisma.user.findMany({
        where: query.where,
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        take: limit,
        skip: page !== undefined && limit !== undefined ? page * limit : undefined,
    });

    return users as Pick<User, Key>[];
};
/**
 * Get user info by id
 * @param {number} id
 */
const getUserById = async <Key extends keyof User>(
    id: number,
    keys: Key[] = ["id", "name", "email", "role", "cpf", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<User, Key>> => {
    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: keys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    });

    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Usuário não encontrado");

    return user as Pick<User, Key>;
};

/**
 * Get user by email
 * @param {string} email
 * @param {Key[]} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByEmail = async <Key extends keyof User>(
    email: string,
    keys: Key[] = ["id", "email", "name", "password", "role", "cpf", "createdAt", "updatedAt"] as Key[]
): Promise<Pick<User, Key> | null> => {
    return prisma.user.findUnique({
        where: { email },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    }) as Promise<Pick<User, Key> | null>;
};

/**
 * Retorna true caso exista outro usuário com um e-mail igual.
 * @param {string} email => E-mail que deseja ser verificado.
 * @param {number} userId => Id do usuário que já possui o e-mail.
 * @returns {Promise<boolean> }
 */
const blOutroUsuarioComEsteEmail = async (email: string, userId?: number): Promise<boolean> => {
    const usuario = await prisma.user.findFirst({
        where: { email, id: { not: userId } },
        select: { id: true },
    });

    return !!usuario;
};

/**
 * Update user by id
 * @param {object} dadosUser => Dados do usuário a ser atualizado
 * @returns {Promise<User>}
 */
const updateUserById = async <Key extends keyof User>(
    dadosUser: { name?: string; email?: string; password?: string } & PartialEntity<User, "id">,
    keys: Key[] = ["id", "email", "name", "role", "cpf", "updatedAt", "createdAt"] as Key[]
): Promise<Pick<User, Key> | null> => {
    const user = await getUserById(dadosUser.id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Usuário não encontrado");

    const userEmailExist = await blOutroUsuarioComEsteEmail(dadosUser.email as string);
    if (!userEmailExist) throw new ApiError(httpStatus.BAD_REQUEST, "Email já cadastrado!");

    const userToUpdate = prisma.user.update({
        where: { id: Number(user.id) },
        data: dadosUser,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    });

    const [updatedUser] = await prisma.$transaction([userToUpdate]);

    return updatedUser as unknown as Pick<User, Key>;
};

/**
 * Delete user by id
 * @param {number} id => Id do usuário a ser deletado
 * @returns {Promise<void>}
 */
const deleteUseById = async (id: number): Promise<void> => {
    const user = await getUserById(id, ["id", "name", "email", "cpf"]);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Usuário não encontrado");

    //TODO - EVITAR DELETES DE ADMINS(caso único admin)

    await prisma.user.delete({
        where: { id: Number(user.id )},
    });
};

export default {
    createUsers,
    queryUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUseById,
};
