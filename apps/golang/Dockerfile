FROM golang:1.20-alpine

WORKDIR /app

COPY app/go.mod ./
COPY app/go.sum ./
RUN go mod download

COPY app/ ./
# Override the config with docker endpoints
COPY app/config-docker.yaml ./config.yaml

RUN go build -o router

EXPOSE 8080

CMD [ "./router" ]