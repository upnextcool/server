FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD [ "node", "pack/server.js" ]
