FROM node:12.15.0-alpine3.11

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

RUN npm run infra:seed

CMD [ "npm", "start" ]
