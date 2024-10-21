import server from "./server";

const port = process.env.PORT;
const version = process.env.npm_package_version;

server.listen(Number(port), () => {
    console.log(`🚀 v${version} Servidor rodando em http://localhost:${port}`);
});

