FROM node:8

WORKDIR /usr/src/myapp

COPY package*.json ./

VOLUME ./usr/src/myapp/public/images

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
