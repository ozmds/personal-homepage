FROM node:13
WORKDIR /app
COPY ./personal/package*.json /app/
RUN npm install
COPY ./personal/ /app/
CMD npm start