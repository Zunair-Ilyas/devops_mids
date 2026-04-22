# Stage 1: Build the React frontend
FROM node:20-alpine AS build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup the Node.js backend
FROM node:20-alpine
WORKDIR /app/backend

# Copy backend dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source code
COPY backend/ ./

# Copy built frontend from Stage 1
COPY --from=build /app/frontend/dist /app/frontend/dist

# Expose the correct port
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]
