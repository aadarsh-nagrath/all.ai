FROM node:18-alpine

WORKDIR /app

# Install git and other dependencies
RUN apk add --no-cache git

# Install dependencies first
COPY package*.json ./
RUN npm install
RUN npm install --save-dev eslint

# Copy the rest of the application
COPY . .

# Initialize git repository for nextra
RUN git init

# Build the application
RUN npm run build

EXPOSE 3001

# Set the port for Next.js
ENV PORT=3001

CMD ["npm", "start"] 