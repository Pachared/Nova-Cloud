package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"nova-api/internal/domain/models"
)

var DB *gorm.DB

func ConnectDatabase() {
	if err := godotenv.Load(); err != nil {
		log.Println("ไม่พบไฟล์ .env กำลังใช้ค่าจาก environment ของระบบแทน")
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=UTC",
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB"),
		os.Getenv("POSTGRES_PORT"),
		postgresSSLMode(),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("เชื่อมต่อฐานข้อมูลไม่สำเร็จ:", err)
	}

	DB = db
	if err := DB.AutoMigrate(&models.Role{}, &models.User{}, &models.RefreshToken{}); err != nil {
		log.Fatal("ไม่สามารถ migrate PostgreSQL schema ได้:", err)
	}
	if err := DB.FirstOrCreate(&models.Role{}, models.Role{Name: "member"}).Error; err != nil {
		log.Fatal("ไม่สามารถสร้าง default role ได้:", err)
	}
}

func postgresSSLMode() string {
	if value := os.Getenv("POSTGRES_SSLMODE"); value != "" {
		return value
	}
	return "disable"
}
