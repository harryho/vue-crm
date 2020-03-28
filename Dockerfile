# Use the official image as a parent image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy the file from your host to your current location
COPY . .

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080

# Run the specified command within the container.
CMD [ "npm",  "start" ]

########################3# 
# docker build . -t  vc-dev
# docker run --publish 8080:8080  --name vc-dev vc-dev:latest