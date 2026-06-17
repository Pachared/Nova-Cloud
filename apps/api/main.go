package main

import (
	"context"
	"log"
	"time"

	"nova-api/internal/config"
	"nova-api/internal/interfaces/http/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(".env"); err != nil {
		log.Println("No .env file found, reading environment variables from system")
	}

	config.ConnectDatabase()
	db := config.DB

	_ = config.ConnectRedisWithRetry(8, 300*time.Millisecond)

	config.StartRedisMonitor(10 * time.Second)

	if config.RDB == nil {
		log.Panicln("Redis = FAIL (Client nil)")
	} else {
		ctx, cancel := context.WithTimeout(config.Ctx, 2*time.Second)
		defer cancel()

		if _, err := config.RDB.Ping(ctx).Result(); err != nil {
			log.Panicln("Redis = FAIL:", err)
		} else {
			log.Println("Redis = CONNECTED")
		}
	}

	gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	routes.SetupRoutes(router)
	routes.BackupRoutes(router, db)

	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
