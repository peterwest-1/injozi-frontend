FROM node:16-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 3000

CMD pnpm dev