package routes

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestRefreshValidatesItsOwnCredential(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	SetupRoutes(router)
	for _, tc := range []struct {
		name   string
		header string
		want   int
	}{
		{"missing refresh credential reaches handler", "", http.StatusBadRequest},
		{"malformed header", "invalid", http.StatusBadRequest},
		{"invalid refresh token", "Bearer invalid", http.StatusUnauthorized},
	} {
		t.Run(tc.name, func(t *testing.T) {
			request := httptest.NewRequest(http.MethodPost, "/auth/refresh", nil)
			request.Header.Set("Authorization", tc.header)
			response := httptest.NewRecorder()
			router.ServeHTTP(response, request)
			if response.Code != tc.want {
				t.Fatalf("got %d, want %d: %s", response.Code, tc.want, response.Body.String())
			}
		})
	}
}

func TestProfileRequiresAccessToken(t *testing.T) {
	router := gin.New()
	SetupRoutes(router)
	response := httptest.NewRecorder()
	router.ServeHTTP(response, httptest.NewRequest(http.MethodGet, "/auth/profile", nil))
	if response.Code != http.StatusUnauthorized {
		t.Fatalf("unprotected profile: %d", response.Code)
	}
}
