package routes

import (
	"nova-api/internal/config"
	"nova-api/internal/interfaces/http/controllers"
	"nova-api/internal/interfaces/http/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// เปิดใช้งาน CORS middleware
	r.Use(middleware.CORSMiddleware())
	// ใส่ database instance ลง context ให้ทุก request ใช้งานได้
	r.Use(middleware.DBMiddleware(config.DB))

	r.GET("/health", controllers.Health)

	// กลุ่ม route สำหรับระบบ Authentication เช่น ลงทะเบียน, เข้าสู่ระบบ
	auth := r.Group("/auth")
	{
		auth.POST("/login", controllers.Login)                                             // POST /auth/login // เข้าสู่ระบบ รับ token
		auth.POST("/github", controllers.GitHubLogin)                                      // POST /auth/github // แลก GitHub OAuth code เป็น token
		auth.GET("/profile", middleware.JWTAuthMiddleware(), controllers.Profile)          // GET /auth/profile // ดูข้อมูลโปรไฟล์ผู้ใช้ (ต้อง login)
		auth.PUT("/profile", middleware.JWTAuthMiddleware(), controllers.UpdateOwnProfile) // PUT /auth/profile // อัปเดตข้อมูลโปรไฟล์ผู้ใช้ (ต้อง login)
		auth.POST("/refresh", middleware.JWTAuthMiddleware(), controllers.RefreshToken)    // POST /auth/refresh // รีเฟรช access token (ต้อง login)
	}

	// กลุ่ม route สำหรับ API ที่ต้อง login ทุกครั้ง
	api := r.Group("/api")
	api.Use(middleware.JWTAuthMiddleware()) // ใช้ JWT ตรวจสอบ token ทุก route ในกลุ่มนี้
	{
		api.GET("/health", controllers.Health)
	}
}
