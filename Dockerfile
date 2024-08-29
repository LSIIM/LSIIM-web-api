# Use uma imagem oficial do Node.js como base
FROM node:20.10.0

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta em que o app vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "index.js"]
