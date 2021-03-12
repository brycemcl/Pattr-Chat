# Note: You can use any Debian/Ubuntu based image you want. 
# [Choice] Ubuntu version: bionic, focal
ARG VARIANT="focal"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# [Option] Install zsh
ARG INSTALL_ZSH="true"
# [Option] Upgrade OS packages to their latest versions
ARG UPGRADE_PACKAGES="false"
# [Option] Enable non-root Docker access in container
ARG ENABLE_NONROOT_DOCKER="true"

# Install needed packages and setup non-root user. Use a separate RUN statement to add your own dependencies.
ARG SOURCE_SOCKET=/var/run/docker-host.sock
ARG TARGET_SOCKET=/var/run/docker.sock
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID
COPY library-scripts/*.sh /tmp/library-scripts/
RUN apt-get update \
  && /bin/bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" \
  # Use Docker script from script library to set things up
  && /bin/bash /tmp/library-scripts/docker-debian.sh "${ENABLE_NONROOT_DOCKER}" "${SOURCE_SOCKET}" "${TARGET_SOCKET}" "${USERNAME}" \
  # Clean up
  && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts/

# Setting the ENTRYPOINT to docker-init.sh will configure non-root access to 
# the Docker socket if "overrideCommand": false is set in devcontainer.json. 
# The script will also execute CMD if you need to alter startup behaviors.
# ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
# CMD [ "sleep", "infinity" ]

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && apt-get -y install --no-install-recommends build-essential entr spell git-secret dos2unix apt-transport-https gnupg2 curl && \
  curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add - && \
  echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list && \
  sudo apt-get update && \
  sudo apt-get install -y kubectl \
  && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts/

COPY --from=digitalocean/doctl:latest /app/doctl /usr/local/bin/doctl
#linkerd cli
USER vscode
RUN curl -sL https://run.linkerd.io/install | sh && sudo mv /home/vscode/.linkerd2/bin/linkerd /usr/bin/linkerd
USER root
###lighthouselab ###
#using apt-get
USER root
SHELL ["/bin/bash", "-o", "pipefail", "-l", "-c"]
RUN apt-get update && \
  apt-get -y install --no-install-recommends \
  build-essential \
  entr \
  dos2unix \
  apt-transport-https \
  gnupg2 \
  curl \
  locales \
  mongodb && \
  apt-get clean -y && \
  rm -rf /var/lib/apt/lists/* /tmp/library-scripts/ && \
  localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8
#install doctl from upstream
COPY --from=digitalocean/doctl:latest /app/doctl /usr/local/bin/doctl
#install kompose from upstream
RUN curl -L https://github.com/kubernetes/kompose/releases/download/latest/kompose-linux-amd64 -o kompose && \
  chmod +x kompose && \
  mv ./kompose /usr/local/bin/kompose
##install postgres from upstream
RUN sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
RUN sudo apt-get update && sudo apt-get -y install postgresql-client-13 postgresql-13 libpq-dev postgresql-server-dev-13
##install nvm(node version manager) from upstream
USER vscode
ENV NVM_DIR /usr/local/nvm
USER root
RUN mkdir /usr/local/nvm
RUN chown vscode:vscode -R "${NVM_DIR}"
USER vscode
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.1/install.sh | bash
USER root
##install latest lts node
USER vscode
RUN nvm install --lts
USER root
##install other versions
USER vscode
RUN nvm install 8
RUN nvm install 10
RUN nvm install 12
RUN nvm install 14
RUN nvm install node
##use latest lts node
# RUN nvm use --lts
# RUN nvm alias default lts/*
# RUN nvm use 10
# RUN nvm alias default 10
RUN nvm use 12
RUN nvm alias default 12
USER root
# RUN bash -l -c 'echo export NODE_PATH="$(which node)" >> /etc/bash.bashrc'
#update npm
USER vscode
RUN npm install npm@latest -g
USER root
#install yarn v1
USER vscode
RUN npm install --global yarn
USER root
#install node-gyp
RUN apt-get update && \
  apt-get -y install --no-install-recommends \
  python3 python-is-python3 \
  g++ gyp && \
  apt-get clean -y && \
  rm -rf /var/lib/apt/lists/* /tmp/library-scripts/
USER vscode
RUN npm install -g node-gyp
USER root

##install webpack
USER vscode
RUN npm i -g webpack webpack-cli webpack-dev-server webpack-dev-middleware
RUN sudo wget https://github.com/sharkdp/hyperfine/releases/download/v1.11.0/hyperfine_1.11.0_amd64.deb && sudo apt install -y ./*.deb && sudo rm hyperfine_1.11.0_amd64.deb
USER root
##install kompose
USER vscode
RUN sudo curl -L https://github.com/kubernetes/kompose/releases/download/v1.22.0/kompose-linux-amd64 -o kompose
RUN sudo chmod +x kompose
RUN sudo mv ./kompose /usr/local/bin/kompose
USER root

####lighthouselint
USER vscode
RUN npm install -g eslint
RUN npm install -g mocha chai nyc
RUN npm install http-server -g
RUN npm install -g lebab 
RUN npm install -g eslint-plugin-cypress
RUN npm install node-pre-gyp -g
RUN npm install -g @types/node @types/react @types/express @types/lodash @types/react-dom @types/yargs @types/jest @types/webpack @types/jsonwebtoken @types/qs @types/glob @types/json-schema @types/body-parser @types/node-fetch @types/request @types/debug @types/prettier @types/react-router-dom @types/jasmine @types/mime @types/uuid @types/minimatch @types/babel__core @types/webpack-env @types/react-redux @types/prop-types @types/q @types/babel__traverse @types/koa @types/istanbul-reports @types/fs-extra @types/yargs-parser @types/minimist @types/express-serve-static-core @types/ws @types/react-router @types/styled-components @types/js-yaml @types/cors @types/mocha @types/mongodb @types/chai @types/babel__generator @types/estree @types/istanbul-lib-coverage @types/babel__template @types/graceful-fs @types/parse-json @types/normalize-package-data @types/jquery @types/stack-utils @types/classnames @types/serve-static @types/long @types/tapable @types/keyv @types/uglify-js @types/istanbul-lib-report @types/webpack-sources @types/connect @types/react-transition-group @types/history @types/react-native @types/mkdirp @types/cacheable-request @types/inquirer @types/unist @types/responselike @types/http-cache-semantics @types/cheerio @types/aws-lambda @types/eslint @types/superagent @types/source-list-map @types/anymatch @types/resolve @types/googlemaps @types/hoist-non-react-statics @types/range-parser @types/selenium-webdriver @types/pg @types/html-minifier-terser @types/tough-cookie @types/bluebird @types/webpack-dev-server @types/http-proxy @types/sinon @types/semver @types/socket.io @types/validator @types/mdast @types/parse5 @types/faker @types/d3 @types/react-test-renderer @types/reach__router @types/hammerjs @types/zen-observable @types/yauzl @types/aria-query @types/cookie @types/react-color @types/mongoose @types/micromatch @types/testing-library__jest-dom @types/rimraf @types/puppeteer @types/react-syntax-highlighter @types/websocket @types/bootstrap @types/http-errors @types/jsdom @types/enzyme @types/sinonjs__fake-timers @types/sizzle @types/npmlog @types/crypto-js @types/socket.io-client @types/passport @types/ramda @types/lodash-es @types/chart.js @types/react-select @types/redis @types/koa-compose @types/caseless @types/hast @types/geojson @types/yup @types/cordova @types/lru-cache @types/tmp @types/accepts @types/core-js @types/supertest @types/request-promise-native @types/js-cookie @types/chai-as-promised @types/ioredis @types/retry @types/events @types/content-disposition @types/bson @types/xml2js @types/cookies @types/overlayscrollbars @types/markdown-to-jsx @types/sequelize @types/codemirror @types/is-function @types/reactcss @types/warning @types/nodemailer @types/react-helmet @types/braces @types/react-beautiful-dnd @types/bn.js @types/glob-base @types/cookie-session @types/invariant @types/async @types/md5 @types/http-proxy-middleware @types/leaflet @types/compression @types/eslint-scope @types/gulp @types/cookiejar @types/mustache @types/express-session @types/json-stable-stringify @types/enzyme-adapter-react-16 @types/color-name @types/ejs @types/express-jwt @types/luxon @types/bcrypt @types/http-assert @types/keygrip @types/underscore @types/pino @types/cookie-parser @types/mime-types @types/chance @types/chrome @types/mapbox-gl @types/d3-shape @types/common-tags @types/file-saver @types/graphql-upload @types/readable-stream @types/angular @types/d3-scale @types/styled-jsx @types/bcryptjs @types/morgan @types/tunnel @types/connect-history-api-fallback @types/through @types/recharts @types/shelljs @types/d3-path @types/argparse @types/request-promise @types/ua-parser-js @types/jasminewd2 @types/cls-hooked @types/config @types/color @types/babylon @types/sprintf-js @types/got @types/gapi.client @types/fs-capacitor @types/mysql @types/configstore @types/webpack-dev-middleware @types/koa-router @types/react-modal @types/object-assign
RUN npm install prettier @prettier/plugin-ruby standard semistandard ts-standard -g
RUN sudo ln -s $(which node) /usr/bin/node
RUN sudo ln -s $(which mocha) /usr/bin/mocha
RUN sudo ln -s $(which nyc) /usr/bin/nyc
RUN sudo ln -s $(which eslint) /usr/bin/eslint
RUN sudo curl -o /.eslintrc.json https://gist.githubusercontent.com/kvirani/6cdb9511522d4357839718a050e7dd3b/raw/.eslintrc.json
USER root
RUN sudo apt-get update && sudo apt-get -y install vmtouch

####install rvm(ruby version manager) from upstream
USER vscode
RUN gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
# RUN curl -sSL https://get.rvm.io | bash -s stable --without-gems="rvm rubygems-bundler bundler"
RUN curl -sSL https://get.rvm.io | bash -s stable
RUN echo "source $HOME/.rvm/scripts/rvm" >> ~/.bash_profile
RUN echo "source $HOME/.rvm/scripts/rvm" >> ~/.bashrc
#Install ruby
# RUN rvm install ruby
# RUN rvm use --default ruby
RUN rvm install ruby-2.7
RUN rvm use --default ruby-2.7
RUN rvm @global do gem uninstall bundler
RUN gem install bundler:1.16.1
RUN gem install rails -v 4.2.6
RUN gem install rubocop  -v 0.81
# RUN gem install erb_lint -v 0.81
# RUN gem install erb_lint
# RUN rvm @global do gem install rufo
# RUN gem install rufo
USER root

# Setting the ENTRYPOINT to docker-init.sh will configure non-root access to 
# the Docker socket if "overrideCommand": false is set in devcontainer.json. 
# The script will also execute CMD if you need to alter startup behaviors.
SHELL ["/bin/bash", "-o", "pipefail", "-l", "-c"]
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]
USER vscode

####wf = watch folder
RUN echo 'wf() { while true; do find . | entr -cdr $@ ; done }' >> ~/.bashrc
RUN echo 'wdc() { while true; do find . ! -path "./.git/*" ! -path "./node_modules/*" | entr -cdr docker-compose up --build --renew-anon-volumes --remove-orphans ; done }' >> ~/.bashrc
RUN echo 'wn() { while true; do find . | entr -cdr node $@  && eslint -c /.eslintrc.json  --fix . > /dev/null && wait; done }' >> ~/.bashrc
RUN echo 'wt() { while true; do find . | entr -cd mocha -R min && eslint -c /.eslintrc.json  --fix . > /dev/null && wait; done }' >> ~/.bashrc
# RUN echo 'wl() { while true; do find . | entr -cd eslint -c /.eslintrc.json  --fix .; done }' >> ~/.bashrc
RUN echo 'lint() { while true; do find . | entr -cd /bin/bash -c "rubocop -a >/dev/null 2>&1 ;standard --fix >/dev/null 2>&1 ;true; prettier --single-quote --write **/*"; done }' >> ~/.bashrc
RUN echo "alias gac='rubocop -a >/dev/null 2>&1 ;standard --fix >/dev/null 2>&1 ;true; prettier --single-quote --write **/* >/dev/null 2>&1 ; true && git add . && git commit && git pull && git push'" >> ~/.bashrc
# RUN echo "alias lint='rubocop -a >/dev/null 2>&1 ;standard --fix >/dev/null 2>&1 ;true; prettier --single-quote --write **/*'" >> ~/.bashrc
RUN echo 'wm() { while true; do find . | entr -dr vmtouch -ft ./ ; done }' >> ~/.bashrc
RUN echo 'to() {  touch $@ && code $@ ;}' >> ~/.bashrc



# erblint --lint-all  --enable-all-linters --autocorrect