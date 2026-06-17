package controllers

import (
	"encoding/base64"
	"log"
	"net/http"
	"nova-api/internal/config"
	"nova-api/internal/domain/models"
	"nova-api/internal/usecases/auth"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var input struct {
		Gmail    string `json:"gmail" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ข้อมูลที่ส่งมาไม่ถูกต้อง: " + err.Error()})
		return
	}

	var user models.User
	if err := config.DB.Preload("Role").Where("gmail = ?", input.Gmail).First(&user).Error; err != nil {
		log.Printf("Failed login attempt for gmail: %s from IP: %s", input.Gmail, c.ClientIP())
		c.JSON(http.StatusUnauthorized, gin.H{"error": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
		return
	}

	if !services.CheckPasswordHash(input.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
		return
	}

	token, err := services.GenerateJWT(user.ID, user.Role.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถสร้าง access token ได้"})
		return
	}

	refreshToken, err := services.GenerateRefreshToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถสร้าง refresh token ได้"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token":         token,
		"refresh_token": refreshToken,
		"role":          user.Role.Name,
	})
}

func Profile(c *gin.Context) {
	userID := c.MustGet("userID").(uint)

	var user models.User
	if err := config.DB.Preload("Role").First(&user, userID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่พบข้อมูลผู้ใช้"})
		return
	}

	var profileImage string
	if len(user.ProfileImage) > 0 {
		profileImage = base64.StdEncoding.EncodeToString(user.ProfileImage)
	} else {
		profileImage = ""
	}

	var roleID uint32 = uint32(user.RoleID)

	resp := models.UserProfileResponse{
		Gmail:        user.Gmail,
		FirstName:    user.FirstName,
		LastName:     user.LastName,
		RoleID:       roleID,
		RoleName:     user.Role.Name,
		ProfileImage: profileImage,
	}

	c.JSON(http.StatusOK, resp)
}

func RefreshToken(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบข้อมูล Authorization header"})
		return
	}

	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "รูปแบบ Authorization header ไม่ถูกต้อง"})
		return
	}
	refreshToken := parts[1]

	claims, err := services.ParseRefreshToken(refreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Refresh token ไม่ถูกต้องหรือหมดอายุ"})
		return
	}

	userID := claims.UserID

	var tokenRecord models.RefreshToken
	err = config.DB.Where("user_id = ? AND token = ?", userID, refreshToken).First(&tokenRecord).Error
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Refresh token นี้ไม่ถูกจดจำในระบบ"})
		return
	}

	if tokenRecord.ExpiresAt.Before(time.Now()) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Refresh token หมดอายุ"})
		return
	}

	var user models.User
	if err := config.DB.Preload("Role").First(&user, userID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่พบข้อมูลผู้ใช้"})
		return
	}

	newAccessToken, err := services.GenerateJWT(user.ID, user.Role.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถสร้าง Access token ใหม่ได้"})
		return
	}

	newRefreshToken, err := services.GenerateRefreshToken(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถสร้าง Refresh token ใหม่ได้"})
		return
	}

	if err := config.DB.Model(&tokenRecord).Update("token", newRefreshToken).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถอัปเดต Refresh token ใหม่ได้"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token":  newAccessToken,
		"refresh_token": newRefreshToken,
	})
}

func RefreshAccessToken(c *gin.Context) {
	var req struct {
		RefreshToken string `json:"refresh_token"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "คำขอไม่ถูกต้อง"})
		return
	}

	claims, err := services.ParseRefreshToken(req.RefreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Refresh token ไม่ถูกต้องหรือหมดอายุ"})
		return
	}

	var rt models.RefreshToken
	if err := config.DB.Where("user_id = ? AND token = ?", claims.UserID, req.RefreshToken).First(&rt).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ไม่พบ Refresh token ในระบบ"})
		return
	}

	user := models.User{}
	config.DB.First(&user, claims.UserID)

	newToken, err := services.GenerateJWT(user.ID, user.Role.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถสร้าง Access token ได้"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token": newToken,
	})
}
