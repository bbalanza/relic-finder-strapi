FROM node:12-alpine

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0
ENV NODE_ENV=production

COPY package*.json ./

RUN yarn set version berry
RUN yarn plugin import workspace-tools
RUN yarn workspaces focus --production

COPY . ./

RUN yarn build

CMD ["yarn", "start"]