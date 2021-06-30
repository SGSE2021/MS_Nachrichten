FROM node:lts
WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install @material-ui/core
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]


# FROM node:lts AS ui-build
# WORKDIR /usr/src/app
# COPY client/user-service ./client/user-service
# RUN cd client/user-service && npm install @angular/cli && npm install && npm run build


# FROM node:lts AS server-build
# WORKDIR /usr/src/app/server
# COPY --from=ui-build /usr/src/app/client/user-service/dist ./client
# #COPY package*.json ./
# COPY server/ .
# COPY database/prisma /usr/src/app/database/prisma
# RUN npm install
# ENV PORT=8080
# EXPOSE 8080
# CMD ["npm","run", "start"]


# FROM node:10 AS ui-build
# # Create app directory
# RUN mkdir -p /usr/src/app
# RUN mkdir -p /usr/src/app/client
# RUN ls /usr/src/app/client
# WORKDIR /usr/src/app/client
# COPY client ./client
# RUN cd ./client && npm install && npm build

# EXPOSE 3000
# CMD [ "npm", "./client/start" ]