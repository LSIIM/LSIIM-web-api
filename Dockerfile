FROM node:20.18.0

WORKDIR /app

COPY package.json package.json
COPY prisma prisma

COPY src src
COPY tsconfig.json tsconfig.json
COPY .env .env

RUN yarn

RUN yarn build

CMD ["yarn", "start"]