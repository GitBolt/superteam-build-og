FROM node:16
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
RUN apt update
RUN apt install -y libx11-xcb-dev
COPY . ./
RUN yarn build
CMD yarn start
