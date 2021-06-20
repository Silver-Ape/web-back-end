FROM node:12.18.1

# Create app directory
WORKDIR /app

COPY package.json ./app

RUN npm install

COPY . /app

CMD [ "npm" ,"start" ]

