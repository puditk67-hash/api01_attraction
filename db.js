const mysql = require('mysql2/promise');
require('dotenv').config({ path: './.env' });

console.log("ENV CHECK:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // 🔥 SSL FIX
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false
  },

  waitForConnections: true,
  connectionLimit: 10
});

// test connect
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ DB CONNECTED SUCCESS");
    conn.release();
  } catch (err) {
    console.error("❌ DB ERROR:", err.message);
  }
})();

module.exports = pool;