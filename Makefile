# docker
IMAGE = manu-frontend

# Parameter
PORT = 80
AUTH_ENDPOINT = endpoint
BACKEND_ENDPOINT = endpoint
LESSON_ENDPOINT = endpoint

build:
	docker build --build-arg VITE_PORT=$(PORT) --build-arg VITE_AUTH_ENDPOINT=$(AUTH_ENDPOINT) --build-arg VITE_PREDICT_ENDPOINT=$(BACKEND_ENDPOINT) --build-arg VITE_LESSON_ENDPOINT=$(LESSON_ENDPOINT) -t $(IMAGE) .

docker-run:
	docker run -p $(PORT):4173 $(IMAGE)
