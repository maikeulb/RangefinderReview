FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --unsafe-perm -g webpack@3.9.1
RUN npm install --quiet
COPY . .

CMD [ "npm", "start" ]
