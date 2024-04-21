FROM node:21-bullseye-slim

# Define build arguments for environment variables
ARG VITE_PORT
ARG VITE_AUTH_ENDPOINT
ARG VITE_PREDICT_ENDPOINT
ARG VITE_LESSON_ENDPOINT

# Set environment variables during the build process
ENV VITE_PORT=$VITE_PORT
ENV VITE_AUTH_ENDPOINT=$VITE_AUTH_ENDPOINT
ENV VITE_PREDICT_ENDPOINT=$VITE_PREDICT_ENDPOINT
ENV VITE_LESSON_ENDPOINT=$VITE_LESSON_ENDPOINT

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

# EXPOSE

EXPOSE 4173

# Build
RUN npm run build

# Run
CMD ["npm", "run", "preview"]
