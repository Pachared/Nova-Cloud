package controllers

var allowedTables = map[string]bool{
	"users":                true,
	"roles":                true,
	"student_applications": true,
	"checkins":             true,
	"dried_food":           true,
	"fresh_food":           true,
	"snack":                true,
	"soft_drink":           true,
	"stationery":           true,
	"sales_today":          true,
	"work_schedules":       true,
	"daily_payments":       true,
}
