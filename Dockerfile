FROM node:12

WORKDIR /html
COPY package*.json ./

RUN npm install -g nodemon --quiet
RUN npm install --quiet