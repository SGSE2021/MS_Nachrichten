FROM node:16-alpine3.11 as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY client/package.json ./
COPY client/package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@4.0.3 -g --silent
COPY client/ ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 





# FROM node:lts
# WORKDIR /usr/src/app

# COPY package*.json ./

# # RUN npm install @material-ui/core
# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]
