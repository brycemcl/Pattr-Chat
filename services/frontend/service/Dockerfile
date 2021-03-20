FROM node:12-buster as build
RUN npm install -g npm@latest
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production
COPY . .
ENV REACT_APP_GRAPHQL_URL='://api.pattr.chat/v1/graphql'
ENV REACT_APP_ADMIN_SECRET='myadminsecretkey'
# RUN cd './src/components/SendMessageForm' && ls && cd '../' && ls
RUN npm run build
FROM nginx as production
COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
RUN chmod -R 555 /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3001

FROM build as test
ENV NODE_ENV=development
RUN npm install
CMD npm test -- --watchAll=false

FROM production