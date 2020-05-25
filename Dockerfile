FROM node:14-alpine as build
ARG API_URL=$API_URL
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . . 
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
