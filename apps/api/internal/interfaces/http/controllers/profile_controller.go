package controllers

import (
	"io"
	"net/http"
	"nova-api/internal/config"
	"nova-api/internal/domain/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func UpdateOwnProfile(c *gin.Context) {
	userID := c.MustGet("userID").(uint)

	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่สามารถอ่านข้อมูลได้"})
		return
	}

	firstName := c.PostForm("first_name")
	lastName := c.PostForm("last_name")
	newPassword := c.PostForm("password")

	imageData, ok := readProfileImage(c)
	if !ok {
		return
	}

	var user models.User
	if err := config.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบผู้ใช้"})
		return
	}

	user.FirstName = firstName
	user.LastName = lastName
	if len(imageData) > 0 {
		user.ProfileImage = imageData
	}

	if newPassword != "" {
		hashed, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "เกิดข้อผิดพลาดในการเข้ารหัสรหัสผ่าน"})
			return
		}
		user.Password = string(hashed)
	}

	if err := config.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถบันทึกข้อมูลได้"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "อัปเดตข้อมูลสำเร็จ"})
}

func readProfileImage(c *gin.Context) ([]byte, bool) {
	file, _, err := c.Request.FormFile("profile_image")
	if err != nil {
		return nil, true
	}
	defer file.Close()

	imageData, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่สามารถอ่านรูปภาพได้"})
		return nil, false
	}

	return imageData, true
}
