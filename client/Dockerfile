FROM node:14

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "dev"]
