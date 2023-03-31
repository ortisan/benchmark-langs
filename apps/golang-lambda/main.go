package main

import (
	"context"
	"encoding/json"
	"io/ioutil"

	"net/http"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	log "github.com/sirupsen/logrus"
)

type StockUrl struct {
	Code string
	Url  string
}

type StockDetails struct {
	Details interface{} `json:"details"`
	Err     error       `json:"error"`
}

type ReturnEvent struct {
	StocksDetails []StockDetails `json:"stocksDetails"`
}

var stocks = []StockUrl{
	StockUrl{Code: "ITSA4.SA", Url: "https://query1.finance.yahoo.com/v7/finance/quote?symbols=ITSA4.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US"},
	// stockUrl{code: "PETR4.SA", url: "https://query1.finance.yahoo.com/v7/finance/quote?symbols=PETR4.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US"},
	// stockUrl{code: "MGLU3.SA", url: "https://query1.finance.yahoo.com/v7/finance/quote?symbols=MGLU3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US"},
	// stockUrl{code: "VALE3.SA", url: "https://query1.finance.yahoo.com/v7/finance/quote?symbols=VALE3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US"},
	// stockUrl{code: "PRIO3.SA", url: "https://query1.finance.yahoo.com/v7/finance/quote?symbols=PRIO3.SA&fields=exchangeTimezoneName,exchangeTimezoneShortName,regularMarketTime&region=US&lang=en-US"},
}

func HandleRequest(ctx context.Context, event events.LambdaFunctionURLRequest) (events.LambdaFunctionURLResponse, error) {

	details, err := fetchUrl(stocks[0].Url)
	var stockDetails *StockDetails
	code := 200
	if err != nil {
		code = 500
		stockDetails = &StockDetails{Err: err}
	} else {
		stockDetails = &StockDetails{Details: details}
	}

	headers := map[string]string{"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}

	response, err := json.Marshal(stockDetails)
	if err != nil {
		log.WithFields(log.Fields{
			"error": err,
		}).Info("Error to marshal response")
		response = []byte("Internal Server Error")
		code = 500
	}

	return events.LambdaFunctionURLResponse{StatusCode: code, Headers: headers, Body: string(response), IsBase64Encoded: false}, nil
}

func fetchUrl(url string) (interface{}, error) {
	client := http.Client{
		Timeout: time.Second * 2, // Timeout after 2 seconds
	}

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.WithFields(log.Fields{
			"error": err,
		}).Info("Error create request")
		return nil, err
	}

	res, err := client.Do(req)
	if err != nil {
		log.WithFields(log.Fields{
			"error": err,
		}).Info("Error make a request")
		return nil, err
	}

	if res.Body != nil {
		defer res.Body.Close()
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.WithFields(log.Fields{
			"error": err,
		}).Info("Error get a response")
		return nil, err
	}

	result := make(map[string]interface{})
	jsonErr := json.Unmarshal(body, &result)
	if jsonErr != nil {
		log.WithFields(log.Fields{
			"error": jsonErr,
		}).Info("Error to marshal response")
	}

	return result, nil
}

func main() {
	lambda.Start(HandleRequest)
}
