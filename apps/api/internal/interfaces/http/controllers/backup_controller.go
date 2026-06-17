package controllers

import (
	"encoding/base64"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type BackupController struct {
	DB *gorm.DB
}

func NewBackupController(db *gorm.DB) *BackupController {
	return &BackupController{DB: db}
}

func (bc *BackupController) BackupTable(c *gin.Context) {
	table := c.Param("table")

	if !allowedTables[table] {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ไม่อนุญาตให้ backup ตารางนี้",
		})
		return
	}

	rows, err := bc.DB.Raw("SELECT * FROM " + table).Rows()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	data, err := scanRows(rows)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Header("Content-Disposition", "attachment; filename="+table+"_backup.json")
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"table": table,
		"data":  data,
	})
}

func (bc *BackupController) BackupAll(c *gin.Context) {
	backup := map[string]interface{}{}

	for table := range allowedTables {

		rows, err := bc.DB.Raw("SELECT * FROM " + table).Rows()
		if err != nil {
			continue
		}

		data, err := scanRows(rows)
		rows.Close()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		backup[table] = data
	}

	filename := "backup_all.json"
	c.Header("Content-Disposition", "attachment; filename="+filename)
	c.Header("Content-Type", "application/json")

	c.JSON(http.StatusOK, backup)
}

func (bc *BackupController) ImportData(c *gin.Context) {

	var payload struct {
		Table string                   `json:"table"`
		Data  []map[string]interface{} `json:"data"`
	}

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "JSON ไม่ถูกต้อง"})
		return
	}

	if !allowedTables[payload.Table] {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ไม่อนุญาตให้เพิ่มข้อมูลในตารางนี้",
		})
		return
	}

	tx := bc.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})
		return
	}

	for _, row := range payload.Data {

		cols := ""
		vals := ""
		args := []interface{}{}
		i := 0

		for k, v := range row {

			if i > 0 {
				cols += ","
				vals += ","
			}

			cols += k
			vals += "?"

			if k == "profile_image" && v != nil {
				if s, ok := v.(string); ok && s != "" {
					decoded, err := base64.StdEncoding.DecodeString(s)
					if err != nil {
						tx.Rollback()
						c.JSON(http.StatusBadRequest, gin.H{
							"error": "profile_image base64 ไม่ถูกต้อง",
						})
						return
					}
					args = append(args, decoded)
				} else {
					args = append(args, nil)
				}
			} else {
				args = append(args, v)
			}

			i++
		}

		query := "INSERT INTO " + payload.Table +
			" (" + cols + ") VALUES (" + vals + ")"

		if err := tx.Exec(query, args...).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "เพิ่มข้อมูลสำเร็จ",
		"rows":    len(payload.Data),
	})
}
