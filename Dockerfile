FROM node:15

WORKDIR /app

COPY ./ ./

RUN npm install

RUN npm install postgres

CMD ["npm","start"]