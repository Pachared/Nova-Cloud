package services

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"nova-api/internal/config"
	"nova-api/internal/domain/models"
)

var JwtSecret []byte
var RefreshSecret []byte

func init() {
	_ = godotenv.Load()

	accessSecret := os.Getenv("ACCESS_TOKEN_SECRET")
	refreshSecret := os.Getenv("REFRESH_TOKEN_SECRET")

	if accessSecret == "" || refreshSecret == "" {
		panic("ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not set")
	}

	JwtSecret = []byte(accessSecret)
	RefreshSecret = []byte(refreshSecret)
}

type JWTClaims struct {
	UserID uint   `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

type RefreshClaims struct {
	UserID uint `json:"user_id"`
	jwt.RegisteredClaims
}

func GenerateJWT(userID uint, role string) (string, error) {
	expirationTime := time.Now().UTC().Add(24 * time.Hour)

	claims := &JWTClaims{
		UserID: userID,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(JwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func GenerateRefreshToken(userID uint) (string, error) {
	tokenString, expirationTime, err := NewRefreshToken(userID)
	if err != nil {
		return "", err
	}
	rt := models.RefreshToken{UserID: userID, Token: tokenString, ExpiresAt: expirationTime}
	if err := config.DB.Create(&rt).Error; err != nil {
		return "", err
	}
	return tokenString, nil
}

// NewRefreshToken signs a unique token without writing a database record.
// Rotation can then replace the previous record atomically.
func NewRefreshToken(userID uint) (string, time.Time, error) {
	expirationTime := time.Now().Add(7 * 24 * time.Hour)
	var id [16]byte
	if _, err := rand.Read(id[:]); err != nil {
		return "", time.Time{}, err
	}

	claims := &RefreshClaims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ID:        hex.EncodeToString(id[:]),
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(RefreshSecret)
	if err != nil {
		return "", time.Time{}, err
	}
	return tokenString, expirationTime, nil
}

func ParseJWT(tokenStr string) (*JWTClaims, error) {
	claims := &JWTClaims{}

	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return JwtSecret, nil
	}, jwt.WithValidMethods([]string{"HS256"}), jwt.WithExpirationRequired())

	if err != nil || token == nil || !token.Valid {
		return nil, errors.New("invalid or expired access token")
	}

	return claims, nil
}

func ParseRefreshToken(tokenStr string) (*RefreshClaims, error) {
	claims := &RefreshClaims{}

	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return RefreshSecret, nil
	}, jwt.WithValidMethods([]string{"HS256"}), jwt.WithExpirationRequired())

	if err != nil || token == nil || !token.Valid {
		return nil, errors.New("invalid or expired refresh token")
	}

	return claims, nil
}
