FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

ARG NODE_PORT

ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV NODE_PORT=${NODE_PORT}
ENV CORS_ORIGIN=${CORS_ORIGIN}

EXPOSE $NODE_PORT

CMD [ "node", "src/index.js" ]