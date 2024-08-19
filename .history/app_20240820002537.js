require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// การตั้งค่าการเชื่อมต่อกับฐานข้อมูล
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// ตรวจสอบการเชื่อมต่อ
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// API สำหรับดึงข้อมูลจากตาราง Users
app.get('/data', (req, res) => {
    const sql = 'SELECT * FROM Users';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            res.status(500).json({ message: 'Error retrieving data' });
            return;
        }
        res.json(results);
    });
});

// การแสดงหน้าเว็บหลัก
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});