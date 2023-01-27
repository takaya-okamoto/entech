FROM debian:stable-slim
WORKDIR /usr/src/app
SHELL ["/bin/bash", "-c"]

COPY package*.json ./

#RUN apt-get update && apt-get install -y curl ca-certificates --no-install-recommends

ENV BASH_ENV ~/.bashrc
ENV VOLTA_HOME /root/.volta
ENV PATH $VOLTA_HOME/bin:$PATH

RUN curl https://get.volta.sh | bash
RUN volta install node

RUN npm i
COPY . ./
RUN npm run build

RUN npm run start

ENTRYPOINT ["bash", "index.tsx"]