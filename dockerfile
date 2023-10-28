FROM node:21-bullseye-slim

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

# EXPOSE

EXPOSE 3000

CMD ["npm", "run", "dev"]