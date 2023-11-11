const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let db = new sqlite3.Database('student.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the student database.');
  }
});

// GET all students
app.get('/students', (req, res) => {
  db.all('SELECT * FROM Students', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET a specific student by ID
app.get('/students/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Students WHERE StudentID = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).send('Student not found');
      return;
    }
    res.json(row);
  });
});

// POST a new student
app.post('/students', (req, res) => {
  const { firstName, lastName, contactInfo } = req.body;
  db.run(
    'INSERT INTO Students (FirstName, LastName, ContactInfo) VALUES (?, ?, ?)',
    [firstName, lastName, contactInfo],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'Student added successfully',
        studentID: this.lastID,
      });
    }
  );
});

// PUT/UPDATE a specific student by ID
app.put('/students/:id', (req, res) => {
  const { firstName, lastName, contactInfo } = req.body;
  const { id } = req.params;
  db.run(
    'UPDATE Students SET FirstName = ?, LastName = ?, ContactInfo = ? WHERE StudentID = ?',
    [firstName, lastName, contactInfo, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.send('Student updated successfully');
    }
  );
});

// DELETE a specific student by ID
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Students WHERE StudentID = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.send('Student deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
