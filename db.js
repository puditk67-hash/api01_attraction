const mysql = require('mysql2/promise');
require('dotenv').config();

// 🔍 debug env (ช่วยเช็คค่าที่โหลด)
console.log("ENV CHECK:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL
});

// ✅ create pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // 🔐 TiDB ต้องใช้ SSL
  ssl: process.env.DB_SSL === 'true'
    ? {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      }
    : undefined,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ✅ test connection ตอน start server
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ DB CONNECTED SUCCESS");
    conn.release();
  } catch (err) {
    console.error("❌ DB ERROR:", err.message);
    console.error("👉 FULL ERROR:", err); // debug ลึก
  }
})();

module.exports = pool;