# Use the official Node.js image as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install the dependencies
RUN npm install

# ARG USERDB_URL
# ENV USERDB_URL=${USERDB_URL}

# RUN npm run db:migrate

ARG CLIENT_PORT
ENV CLIENT_PORT=${CLIENT_PORT}

# Expose the port that the app runs on
EXPOSE $CLIENT_PORT

# Define the command to run the application
CMD ["npm", "run", "dev"]