# Base image
FROM node:alpine

# Working directory
WORKDIR /usr/app

# Copy package.json to working directory
COPY ./package.json ./

# Install dependencies
RUN npm install

# Copy all files to working directory
COPY ./ ./

# Default command
CMD ["npm", "start"]