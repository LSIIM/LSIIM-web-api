import { encryptPassword } from "../utils/encryption";
import prisma from "../prisma/prisma";
async function createDefaultAdmin() {
    try {
        await prisma.user.create({
            data: {
                name: "Super Usuário",
                email: "super@usuario.com",
                password: await encryptPassword("123"),
                role: "ADMIN",
                documento: "123",
            },
        });
        console.log("Usuário administrador criado!");
    } catch (err) {
        throw err;
    }
}
createDefaultAdmin();
