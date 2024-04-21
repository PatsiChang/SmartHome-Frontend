#React app image
FROM node:18-alpine
ENV PORT 3000
WORKDIR /boot
COPY ./package.json ./
#Todo: check how to install in expo before run web
RUN npm install -g npm@10.5.2
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "web" ]
