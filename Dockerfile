# Use a base image with Node.js
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
COPY . .
RUN npm install

# Copy the rest of the application code

# Generate Prisma Client
RUN npx prisma generate

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js development server
CMD ["npm", "run", "dev"]