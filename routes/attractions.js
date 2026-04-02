const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM attractions');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET by id
router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM attractions WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST
router.post('/', async (req, res, next) => {
  try {
    const { name, detail, coverimage, latitude, longitude, likes } = req.body;

    const [result] = await db.query(
      `INSERT INTO attractions 
      (name, detail, coverimage, latitude, longitude, likes)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, detail, coverimage, latitude, longitude, likes || 0]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    next(err);
  }
});

// PUT
router.put('/:id', async (req, res, next) => {
  try {
    const { name, detail, coverimage, latitude, longitude, likes } = req.body;

    const [result] = await db.query(
      `UPDATE attractions 
       SET name=?, detail=?, coverimage=?, latitude=?, longitude=?, likes=?
       WHERE id=?`,
      [name, detail, coverimage, latitude, longitude, likes, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ message: 'Updated' });
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const [result] = await db.query(
      'DELETE FROM attractions WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;