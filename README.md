# API - LSIIM

## Como rodar localmente

### Instale o NodeJs
Para rodar localmente primeiro deve-se instalar o [NodeJs](https://nodejs.org/en/download/package-manager).

### Instale o Yarn
Recomenda-se também a instalação do [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) para gerenciamento de dependências. 

### Defina as variáveis de ambiente
1. Na raiz do projeto crie um arquivo chamado de `.env`. 
2. Copie o conteudo do arquivo `.env.example` e cole no arquivo `.env` criado.
3. Modifique as variaveis de acordo com seu ambiente.

### Instale as dependências 
Para instalar as dependências do projeto e rodar localmente o sistema digite em um terminal na raiz do projeto:

```
    yarn
```

### Para inserir dados no banco local rode o comando

```
    yarn seed
```

### Para rodar localmente

```
    yarn start
```