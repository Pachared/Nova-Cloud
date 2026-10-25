package services

import (
	"testing"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func TestTokenValidation(t *testing.T) {
	for _, kind := range []string{"access", "refresh"} {
		t.Run(kind, func(t *testing.T) {
			secret := JwtSecret
			if kind == "refresh" {
				secret = RefreshSecret
			}
			for _, tc := range []struct {
				name   string
				method jwt.SigningMethod
				expiry *jwt.NumericDate
				key    []byte
				valid  bool
			}{
				{"valid", jwt.SigningMethodHS256, jwt.NewNumericDate(time.Now().Add(time.Hour)), secret, true},
				{"expired", jwt.SigningMethodHS256, jwt.NewNumericDate(time.Now().Add(-time.Hour)), secret, false},
				{"no expiry", jwt.SigningMethodHS256, nil, secret, false},
				{"wrong algorithm", jwt.SigningMethodHS512, jwt.NewNumericDate(time.Now().Add(time.Hour)), secret, false},
				{"wrong key", jwt.SigningMethodHS256, jwt.NewNumericDate(time.Now().Add(time.Hour)), []byte("wrong-key"), false},
			} {
				t.Run(tc.name, func(t *testing.T) {
					claims := jwt.MapClaims{"user_id": 42, "role": "member"}
					if tc.expiry != nil {
						claims["exp"] = tc.expiry.Unix()
					}
					token, err := jwt.NewWithClaims(tc.method, claims).SignedString(tc.key)
					if err != nil {
						t.Fatal(err)
					}
					if kind == "access" {
						_, err = ParseJWT(token)
					} else {
						_, err = ParseRefreshToken(token)
					}
					if (err == nil) != tc.valid {
						t.Fatalf("valid=%v, error=%v", tc.valid, err)
					}
				})
			}
		})
	}
}

func TestNewRefreshTokenIsUniqueAndValid(t *testing.T) {
	first, expiry, err := NewRefreshToken(42)
	if err != nil {
		t.Fatal(err)
	}
	second, _, err := NewRefreshToken(42)
	if err != nil {
		t.Fatal(err)
	}
	if first == second {
		t.Fatal("consecutive refresh tokens must be unique")
	}
	claims, err := ParseRefreshToken(first)
	if err != nil || claims.UserID != 42 || claims.ID == "" {
		t.Fatalf("unexpected claims: %+v, error: %v", claims, err)
	}
	if expiry.Sub(time.Now()) < 7*24*time.Hour-time.Minute {
		t.Fatal("refresh token expiry should be seven days")
	}
}
