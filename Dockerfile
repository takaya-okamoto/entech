FROM node:18.11-slim
WORKDIR /usr/src/app
#
#COPY package*.json ./

COPY . .

RUN npm i
RUN npm run build
CMD["node", 'index.tsx']