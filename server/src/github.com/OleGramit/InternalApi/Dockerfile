# set base image
FROM golang:1.16.5-alpine3.13

# create /app directory within image
RUN mkdir /app

# copy everything in the root directory into /app directory
ADD . /app

# set the working directory in the container
WORKDIR /app

# pull in dependencies
RUN go mod download

ENV OWN_REST_URL=localhost:8282

ENV USER_REST_URL=https://userverwaltung.microservices.svc.cluster.local:8181/
# ENV USER_REST_URL=https://sgse2021.westeurope.cloudapp.azure.com/api/users/

ENV MOGODB_URL=mongodb://messagedb-user:v60TJstCeL@messages-mongodb.support.svc.cluster.local:27017/messagedb
# ENV MOGODB_URL=mongodb://localhost

EXPOSE 8181
EXPOSE 8282

# compile the binary
RUN go build -o server .

# start command for binary executable
CMD ["/app/server"]
