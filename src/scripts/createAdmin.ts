// import { encryptPassword } from "../utils/encryption";
// import prisma from "../prisma/prisma";

// async function createDefaultAdmin() {
//   try {
//     await prisma.user.create({
//       data: {
//         name: "",
//         email: "",
//         password: await encryptPassword(""),
//         role:"ADMIN"
//       },
//     });
//     console.log("Usuário administrador criado!");
//   } catch (err) {
//     throw err;
//   }
// }

// createDefaultAdmin();