# FROM node:12.0.0-alpine

FROM mhart/alpine-node:12

# install dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --prod --frozen-lockfile






# Only copy over the Node pieces we need ~> Saves 35MB
FROM mhart/alpine-node:slim-12

# ENV ARX_HOST http://dinoey.com
# ENV ARX_GRAPHCMS_MEDIA https://media.graphcms.com/

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 3000
CMD node __sapper__/build
