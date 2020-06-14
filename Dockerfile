FROM node:12

WORKDIR /html

RUN npm install -g nodemon --quiet
RUN npm install --quiet