# install dependencies
FROM mhart/alpine-node:12
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --prod --frozen-lockfile

# only copy over the node pieces we need ~> saves 35mb
FROM mhart/alpine-node:slim-12
WORKDIR /app
COPY --from=0 /app .
COPY . .
EXPOSE 3000
CMD node __sapper__/build
