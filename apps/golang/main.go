package main

import (
	"benchmark/config"
	"benchmark/telemetry"
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/reactivex/rxgo/v2"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
)

type stockUrl struct {
	code string
	url  string
}

type stockDetails struct {
	details interface{} `json:"details"`
	err     error       `json:"error"`
}

type returnEvent struct {
	stocksDetails []stockDetails `json:"stocksDetails"`
}

var stocks = []stockUrl{
	stockUrl{code: "ITSA4.SA", url: "https://query1.finance.yahoo.com/v7/finance/quote?symbols=ITSA4.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US"},
	stockUrl{code: "PETR4.SA", url: "https://query1.finance.yahoo.com/v7/finance/quote?symbols=PETR4.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US"},
	stockUrl{code: "MGLU3.SA", url: "https://query1.finance.yahoo.com/v7/finance/quote?symbols=MGLU3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US"},
	stockUrl{code: "VALE3.SA", url: "https://query1.finance.yahoo.com/v7/finance/quote?symbols=VALE3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US"},
	stockUrl{code: "PRIO3.SA", url: "https://query1.finance.yahoo.com/v7/finance/quote?symbols=PRIO3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US"},
}

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
	r.GET("/ping", Ping)
	r.GET("/stocks", FetchStocks)
	r.Run(config.ConfigObj.App.ServerAddress)
}

func HealthCheck(c *gin.Context) {
	res := map[string]interface{}{
		"status": "up",
	}
	c.JSON(http.StatusOK, res)
}

func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func FetchStocks(c *gin.Context) {
	observable := rxgo.Just(stocks)()
	observable.Map(func(_ context.Context, item interface{}) (interface{}, error) {
		su := item.(stockUrl)
		details, err := fetchUrl(su.url)
		if err != nil {
			return &stockDetails{err: err}, nil
		}
		return &stockDetails{details: details}, nil
	},
		rxgo.WithPool(5),
	)

	var stocksDetails []stockDetails
	for detailItem := range observable.Observe() {
		stocksDetails = append(stocksDetails, stockDetails{details: detailItem.V, err: detailItem.E})
	}

	response, err := json.Marshal(returnEvent{stocksDetails: stocksDetails})
	if err != nil {
		response = []byte("Internal Server Error")
		c.JSON(http.StatusInternalServerError, response)
		return
	}
	c.JSON(http.StatusOK, response)
}

func fetchUrl(url string) (interface{}, error) {
	client := http.Client{
		Timeout: time.Second * 2, // Timeout after 2 seconds
	}

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}

	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	if res.Body != nil {
		defer res.Body.Close()
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	result := make(map[string]interface{})
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}

	return result, nil
}
