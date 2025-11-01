# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app's source code
COPY . .

# Build for production
# This will use your .env.example, so VITE_API_BASE is http://localhost:8080/api
# We will fix this with Nginx in the next stage.
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default Nginx content
RUN rm -rf ./*

# Copy the built files from the build stage
COPY --from=build /app/dist .

# Copy our custom Nginx config (we will create this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]