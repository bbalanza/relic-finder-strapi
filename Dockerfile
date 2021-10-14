FROM node:12-alpine

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --only=production

COPY . ./

RUN npm run build
RUN npm run strapi config:restore -f database-config.json -s replace

CMD ["npm", "start"]