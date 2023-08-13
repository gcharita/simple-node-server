FROM node:alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock .

RUN yarn install --production --ignore-scripts

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start" ]