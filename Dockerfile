FROM lsiim_api_base:latest AS build

# # PORT DATABASE_URL JWT_SECRET JWT_ACCESS_EXPIRATION_MINUTES JWT_REFRESH_EXPIRATION_DAYS URL_BASE_PATH JWT_REFRESH_EXPIRATION_DAYS RECORDINGS_PATH
ARG PORT
ARG DATABASE_URL
ARG JWT_SECRET
ARG JWT_ACCESS_EXPIRATION_MINUTES
ARG JWT_REFRESH_EXPIRATION_DAYS
ARG URL_BASE_PATH
ARG JWT_REFRESH_EXPIRATION_DAYS

WORKDIR /app




COPY package.json package.json
COPY prisma prisma


# copy node_modules to /build
# RUN cp -r node_modules /build

COPY src src
COPY tsconfig.json tsconfig.json
COPY .env .env

RUN yarn
RUN npx prisma db seed
RUN yarn build

# copia pasta python para o dist
# Ensure the target directory exists before copying
RUN mkdir -p /app/src/utils/python && cp -r /app/src/utils/python /app/dist/src/utils/python



CMD ["yarn", "start"]