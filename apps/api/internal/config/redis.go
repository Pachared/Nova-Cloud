package config

import (
	"context"
	"errors"
	"log"
	"math/rand"
	"os"
	"sync"
	"time"

	"github.com/redis/go-redis/v9"
)

var (
	RDB *redis.Client
	Ctx = context.Background()
	mu  sync.RWMutex
)

func redisURLFromEnv() string {
	if v := os.Getenv("REDIS_PUBLIC_URL"); v != "" {
		return v
	}
	return os.Getenv("REDIS_URL")
}

func newRedisClient(redisURL string) (*redis.Client, error) {
	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		return nil, err
	}

	opt.DialTimeout = 5 * time.Second
	opt.ReadTimeout = 3 * time.Second
	opt.WriteTimeout = 3 * time.Second

	opt.MaxRetries = 3
	opt.MinRetryBackoff = 200 * time.Millisecond
	opt.MaxRetryBackoff = 2 * time.Second

	return redis.NewClient(opt), nil
}

func ConnectRedisWithRetry(maxAttempts int, baseDelay time.Duration) error {
	redisURL := redisURLFromEnv()
	if redisURL == "" {
		log.Println("ไม่พบ REDIS_URL ระบบจะทำงานโดยไม่ใช้ Redis (fallback DB)")
		setRedisClient(nil)
		return nil
	}

	var lastErr error

	for attempt := 1; attempt <= maxAttempts; attempt++ {
		client, err := newRedisClient(redisURL)
		if err != nil {
			lastErr = err
			log.Printf("Redis parse/new client failed (attempt %d/%d): %v\n", attempt, maxAttempts, err)
			sleepBackoff(attempt, baseDelay)
			continue
		}

		ctx, cancel := context.WithTimeout(Ctx, 3*time.Second)
		_, pingErr := client.Ping(ctx).Result()
		cancel()

		if pingErr == nil {
			log.Println("เชื่อมต่อ Redis สำเร็จแล้ว")
			setRedisClient(client)
			return nil
		}

		_ = client.Close()
		lastErr = pingErr
		log.Printf("Redis ping failed (attempt %d/%d): %v\n", attempt, maxAttempts, pingErr)
		sleepBackoff(attempt, baseDelay)
	}

	log.Println("เชื่อมต่อ Redis ไม่สำเร็จ จะใช้ DB แทน:", lastErr)
	setRedisClient(nil)
	return lastErr
}

func setRedisClient(c *redis.Client) {
	mu.Lock()
	defer mu.Unlock()

	if RDB != nil {
		_ = RDB.Close()
	}
	RDB = c
}

func GetRedis() *redis.Client {
	mu.RLock()
	defer mu.RUnlock()
	return RDB
}

func init() {
	rand.Seed(time.Now().UnixNano())
}

func sleepBackoff(attempt int, base time.Duration) {
	if base <= 0 {
		base = 300 * time.Millisecond
	}

	shift := attempt - 1
	if shift > 10 {
		shift = 10
	}

	exp := 1 << (attempt - 1)
	delay := time.Duration(exp) * base

	maxDelay := 5 * time.Second
	if delay > maxDelay {
		delay = maxDelay
	}

	jitter := time.Duration(rand.Int63n(int64(base)))
	time.Sleep(delay + jitter)
}

var ErrRedisUnavailable = errors.New("redis unavailable")

func StartRedisMonitor(interval time.Duration) {
	if interval <= 0 {
		interval = 10 * time.Second
	}

	go func() {
		ticker := time.NewTicker(interval)
		defer ticker.Stop()

		for range ticker.C {
			client := GetRedis()

			if client == nil {
				_ = ConnectRedisWithRetry(3, 300*time.Millisecond)
				continue
			}

			ctx, cancel := context.WithTimeout(Ctx, 2*time.Second)
			_, err := client.Ping(ctx).Result()
			cancel()

			if err != nil {
				log.Println("Redis monitor: ping fail -> fallback nil and retry next tick:", err)
				setRedisClient(nil)
			}
		}
	}()
}
