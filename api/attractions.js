const mysql = require('mysql2/promise');

module.exports = async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: { rejectUnauthorized: true }
    });

    const [rows] = await connection.query('SELECT * FROM attractions');

    res.status(200).json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};