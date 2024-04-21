FROM node:21-bullseye-slim

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
