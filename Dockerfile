FROM node:16-alpine

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0
ENV NODE_ENV=production

COPY .yarn/ .yarn/
COPY package*.json .yarnrc.yml yarn.lock ./
RUN yarn workspaces focus --all --production 
COPY ./ ./
RUN yarn build

CMD ["yarn", "start"]
