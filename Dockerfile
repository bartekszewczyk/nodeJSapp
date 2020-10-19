FROM node:10

RUN mkdir /app

WORKDIR /app

COPY . /app

EXPOSE 80

RUN npm install -g nodemon

CMD [ "nodemon", "app.js" ]
