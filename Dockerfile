FROM node:20-buster-slim as development

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .