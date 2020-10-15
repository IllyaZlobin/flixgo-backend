FROM node:12.13-alpine As development

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install -g typescript typeorm ts-node
RUN npm run-script build 

EXPOSE 3000