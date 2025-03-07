FROM node:23
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "start"]