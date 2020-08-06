FROM node:13-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install --production --ignore-scripts

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start" ]