package controllers

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"net/http"
	"strings"

	"nova-api/internal/config"
	"nova-api/internal/domain/models"
	services "nova-api/internal/usecases/auth"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GitHubLogin(c *gin.Context) {
	var input struct {
		Code        string `json:"code" binding:"required"`
		RedirectURI string `json:"redirect_uri" binding:"required,url"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "GitHub callback is invalid"})
		return
	}

	profile, email, err := services.FetchGitHubIdentity(input.Code, input.RedirectURI)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "GitHub authorization failed"})
		return
	}

	user, err := findOrCreateGitHubUser(profile, email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create Nova account"})
		return
	}
	accessToken, err := services.GenerateJWT(user.ID, user.Role.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create access token"})
		return
	}
	refreshToken, err := services.GenerateRefreshToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create refresh token"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": accessToken, "refresh_token": refreshToken, "role": user.Role.Name})
}

func findOrCreateGitHubUser(profile services.GitHubProfile, email string) (models.User, error) {
	githubID := strings.TrimSpace(profile.Login)
	if githubID == "" {
		return models.User{}, errors.New("GitHub account has no login")
	}

	var user models.User
	err := config.DB.Preload("Role").Where("github_id = ?", githubID).First(&user).Error
	if err == nil {
		return user, nil
	}
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return models.User{}, err
	}

	err = config.DB.Preload("Role").Where("gmail = ?", email).First(&user).Error
	if err == nil {
		if user.GitHubID != nil && *user.GitHubID != githubID {
			return models.User{}, errors.New("email belongs to another GitHub account")
		}
		user.GitHubID = &githubID
		return user, config.DB.Save(&user).Error
	}
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return models.User{}, err
	}

	var role models.Role
	if err := config.DB.Where("name = ?", "member").First(&role).Error; err != nil {
		return models.User{}, err
	}
	password, err := randomPassword()
	if err != nil {
		return models.User{}, err
	}
	name := strings.Fields(profile.Name)
	firstName, lastName := profile.Login, ""
	if len(name) > 0 {
		firstName = name[0]
		lastName = strings.Join(name[1:], " ")
	}
	user = models.User{Gmail: email, Password: password, FirstName: firstName, LastName: lastName, RoleID: role.ID, GitHubID: &githubID, Role: role}
	if err := config.DB.Create(&user).Error; err != nil {
		return models.User{}, err
	}
	return user, nil
}

func randomPassword() (string, error) {
	buffer := make([]byte, 32)
	if _, err := rand.Read(buffer); err != nil {
		return "", err
	}
	return services.HashPassword(base64.RawURLEncoding.EncodeToString(buffer))
}
