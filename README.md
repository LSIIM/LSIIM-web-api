# API - LSIIM

### Pré-requisitos:

- Primeiro deve-se instalar o [NodeJs - v20.18.0](https://nodejs.org/en/download/package-manager).
- Recomenda-se também a instalação do [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) para gerenciamento de dependências.
- É necessário para rodar o banco de dados e a aplicação no ambiente local instalar o [Docker](https://docs.docker.com/get-started/)
### Defina as variáveis de ambiente

1. Na raiz do projeto crie um arquivo chamado de `.env`.
2. Copie o conteudo do arquivo `.env.example` e cole no arquivo `.env` criado.
3. Modifique as variaveis de acordo com seu ambiente.

### Instale as dependências

Para instalar as dependências do projeto e rodar localmente o sistema digite em um terminal na raiz do projeto:

> Certifique-se de que o Docker está instalado e rodando. 

```
    // Instala as dependências necessárias
    yarn

    // Para subir os conteiners no docker
    yarn db:up

    // Migra o schema do prisma para o banco de dados
    yarn prisma:dev

    // Roda a api em modo desenvolvimento
    yarn start:dev
```

- Para derrubar o docker, rode o comando `yarn db:down`

## Seeds
- Realizar as seeds na raiz do projeto digitando o seguinte comando:
```npx prisma db seed```

- As seeds se encontram no caminho prisma/seeds/seed.ts.


## Adicionais

### Criar administrador local

Utilizando `npm` digite em um terminal na raiz do projeto:
```
    npm run create-admin
```

Utilizando `yarn` digite em um terminal na raiz do projeto:

```
    yarn create-admin
```

### Configurando o git

Caso queira, é interessante remover o `origin` do repositório, para adicionar seu próprio repositório remoto e continuar o desenvolvimento.

Para ver os repositórios remotos:

```bash
git remote -v
```

Para trocar o origin:

```bash
git remote remove origin
git remote add origin <url>
```

Sendo `<url>` o diretório do seu repositório remoto.