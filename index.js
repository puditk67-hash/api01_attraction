const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });

const attractionsRoutes = require('./routes/attractions');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/attractions', attractionsRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({ error: err.message });
});

module.exports = app;

// run dev only
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3333;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}