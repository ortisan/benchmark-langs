package main

import (
	"benchmark/config"
	"benchmark/telemetry"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
)

func main() {

	// Config telemetry
	tp, err := telemetry.Setup()
	if err != nil {
		panic(err)
	}
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	// Graceful shutdown and flush telemetry when the application exits.
	defer func(ctx context.Context) {
		// Do not make the application hang when it is shutdown.
		ctx, cancel = context.WithTimeout(ctx, time.Second*5)
		defer cancel()
		if err := tp.Shutdown(ctx); err != nil {
			panic(err)

		}
	}(ctx)

	// Routers
	r := gin.Default()
	// Middlewares
	r.Use(otelgin.Middleware("go-app"))              // Tracer
	r.Use(gin.Logger())                              // Logger request/response
	r.GET("/metrics", gin.WrapH(promhttp.Handler())) // Prometheus metrics
	r.GET("/healthcheck", HealthCheck)
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.Run(config.ConfigObj.App.ServerAddress)
}

func HealthCheck(c *gin.Context) {
	res := map[string]interface{}{
		"status": "up",
	}
	c.JSON(http.StatusOK, res)
}
