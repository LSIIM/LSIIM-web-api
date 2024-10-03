import server from "./server";

const port = process.env.PORT;

server.listen(Number(port), () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});