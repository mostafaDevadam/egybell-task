FROM node:22.16.0-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

# Match this to whatever port main.js uses
EXPOSE 5000 

CMD ["node", "main.js"]