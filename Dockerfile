# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application with analytics
CMD ["yarn", "start:analytics"]
