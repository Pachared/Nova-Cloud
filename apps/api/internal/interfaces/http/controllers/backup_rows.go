package controllers

import "database/sql"

func scanRows(rows *sql.Rows) ([]map[string]interface{}, error) {
	columns, err := rows.Columns()
	if err != nil {
		return nil, err
	}

	data := []map[string]interface{}{}
	for rows.Next() {
		row, err := scanRow(rows, columns)
		if err != nil {
			return nil, err
		}
		data = append(data, row)
	}

	return data, rows.Err()
}

func scanRow(rows *sql.Rows, columns []string) (map[string]interface{}, error) {
	values := make([]interface{}, len(columns))
	ptrs := make([]interface{}, len(columns))
	for i := range values {
		ptrs[i] = &values[i]
	}

	if err := rows.Scan(ptrs...); err != nil {
		return nil, err
	}

	row := map[string]interface{}{}
	for i, col := range columns {
		row[col] = normalizeValue(col, values[i])
	}

	return row, nil
}

func normalizeValue(col string, v interface{}) interface{} {
	b, ok := v.([]byte)
	if !ok {
		return v
	}

	if col == "profile_image" {
		return b
	}

	return string(b)
}
