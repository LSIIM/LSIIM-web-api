FROM node:20.18.0 AS build

# # PORT DATABASE_URL JWT_SECRET JWT_ACCESS_EXPIRATION_MINUTES JWT_REFRESH_EXPIRATION_DAYS URL_BASE_PATH JWT_REFRESH_EXPIRATION_DAYS RECORDINGS_PATH
ARG PORT
ARG DATABASE_URL
ARG JWT_SECRET
ARG JWT_ACCESS_EXPIRATION_MINUTES
ARG JWT_REFRESH_EXPIRATION_DAYS
ARG URL_BASE_PATH
ARG JWT_REFRESH_EXPIRATION_DAYS

WORKDIR /app

# install python3 and pip
RUN apt-get update && apt-get install -y python3 python3-pip
# isntall python-opencv
RUN pip install --break-system-packages opencv-python
RUN alias python=python3
# set the alias to be permanent
RUN echo "alias python=python3" >> ~/.bashrc
RUN ln -s /usr/bin/python3 /usr/bin/python




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


CMD ["yarn", "start"]