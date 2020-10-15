FROM node:12.7

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install -g typescript typeorm ts-node
RUN npm run-script build 

EXPOSE 3000

CMD ["npm", "run", "start:dev"]