FROM node:18.11-slim
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i
COPY . ./
RUN npm run build
RUN npm run start