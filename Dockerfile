FROM node:20-alpine AS base

FROM base AS backend-base
WORKDIR /usr/local/app/backend
COPY ./backend/*.json ./
RUN npm install
COPY ./backend/src ./src


FROM backend-base AS backend-dev
CMD ["npm", "run", "dev"]

FROM base AS client-base
WORKDIR /usr/local/app/client
COPY ./client/*.json ./
RUN npm install -g @angular/cli
RUN npm install --force
COPY ./client/src ./src
COPY ./client/public ./public


FROM client-base as client-dev
CMD ["ng", "serve", "--host", "0.0.0.0"]