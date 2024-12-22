FROM node:18.19-alpine3.18 as build
WORKDIR /app
COPY public/ /app/public
COPY package*.json ./
RUN npm install
COPY ./. ./
RUN npm run build

FROM nginx:1.25.3-alpine3.18-perl
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build/. ./.