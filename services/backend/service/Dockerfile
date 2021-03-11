FROM node:12-buster as build
RUN npm install -g npm@latest
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

FROM build as test
ENV NODE_ENV=development
RUN npm install
CMD npm test -- --watchAll=false

FROM build