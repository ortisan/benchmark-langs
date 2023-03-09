package config

import (
	"github.com/spf13/viper"
)

type Config struct {
	App           App           `mapstructure:"app"`
	OpenTelemetry OpenTelemetry `mapstructure:"opentelemetry"`
	Servers       []Server      `mapstructure:"servers"`
}

type App struct {
	Name          string `mapstructure:"name"`
	ServerAddress string `mapstructure:"server_address"`
}

type OpenTelemetry struct {
	AgentHost string `mapstructure:"agent_host"`
	AgentPort string `mapstructure:"agent_port"`
}

type Credentials struct {
	AccessKeyID  string `mapstructure:"access_key_id"`
	ClientSecret string `mapstructure:"secret_access_key"`
}

type HealthCheck struct {
	Type     string `mapstructure:"type"`
	Endpoint string `mapstructure:"endpoint"`
}

type Server struct {
	ServicePrefix string      `mapstructure:"service_prefix"`
	ServerName    string      `mapstructure:"server_name"`
	EndpointUrl   string      `mapstructure:"endpoint_url"`
	ZoneAws       string      `mapstructure:"zone_aws"`
	Alive         bool        `mapstructure:"alive"`
	HealthCheck   HealthCheck `mapstructure:"healthcheck"`
}

func Setup() (config Config) {
	viper.AddConfigPath(".")
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")

	var err = viper.ReadInConfig()
	if err != nil {
		panic(err)
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		panic(err)
	}

	return
}

var ConfigObj = Setup()
