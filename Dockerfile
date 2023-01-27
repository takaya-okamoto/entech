FROM node:18.11-slim
WORKDIR /usr/src/app
SHELL ["/bin/bash", "-c"]

RUN npm i
COPY . ./
RUN npm run build
RUN npm run start