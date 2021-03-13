FROM node:12-buster as build
RUN npm install -g npm@latest
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt buster-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update && apt-get -y install postgresql
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]





# FROM build as test
# ENV NODE_ENV=development
# RUN npm install
# CMD npm test -- --watchAll=false

FROM build