# install dependencies
FROM node:13
WORKDIR /app
COPY package.json yarn.lock ./
RUN apt-get update && apt-get install -y git
RUN yarn install --prod --frozen-lockfile

# only copy over the node pieces we need ~> saves 35mb
FROM mhart/alpine-node:slim-13
WORKDIR /app
COPY --from=0 /app .
COPY . .
EXPOSE 3000
CMD node build
