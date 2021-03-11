FROM node:12-buster as build
RUN npm install -g npm@latest
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y default-jdk
RUN npm install -g firebase-tools
COPY ["functions/package.json", "functions/package-lock.json*", "functions/npm-shrinkwrap.json*", "./functions/"]
RUN cd functions && npm install --production
COPY . .
# auth emulator port
EXPOSE 9099 
# functions emulator port
EXPOSE 8001 
# Emulator UI port
EXPOSE 8002 
CMD ["firebase", "emulators:start"]