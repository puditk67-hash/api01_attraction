const express = require('express');
const cors = require('cors');
require('dotenv').config();

const attractionsRoutes = require('./routes/attractions');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/attractions', attractionsRoutes);

// error handler (แก้แล้ว)
app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({ error: err.message });
});

// export for Vercel
module.exports = app;

// run only in dev
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3333;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}