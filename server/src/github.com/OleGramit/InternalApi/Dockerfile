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

ENV OWN_REST_URL=localhost:8080

ENV USER_REST_URL=https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/
ENV COURSES_REST_URL=https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/


EXPOSE 8080

# compile the binary
RUN go build -o server .

# start command for binary executable
CMD ["/app/server"]
