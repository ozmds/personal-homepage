FROM node:13 as build-stage
WORKDIR /app
COPY ./personal/package*.json /app/
RUN npm install
COPY ./personal/ /app/
RUN npm run build

FROM nginx:1.15.2-alpine
COPY --from=build-stage /app/build/ /var/www/
COPY deployments/personal_homepage/prod/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]