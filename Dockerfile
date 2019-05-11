FROM node:8.9.3 as builder

MAINTAINER closertb closertb <closertb@sina.com>

RUN \
npm i nrm -g && \
nrm use taobao

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
## COPY nginx.conf /etc/nginx
COPY --from=builder /app/dist /usr/share/nginx/html

## docker rmi $(docker images -f "dangling=true" -q)