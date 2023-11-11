// You can use the node-sqlite3 library to create and interact with an SQLite database in Node.js
// Install the library using npm install sqlite3
const sqlite3 = require('sqlite3').verbose();

// Create a new database in memory or create a new file if the file does not exist
let db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the mydatabase database.');
  }
});

// Now, you can create the tables using the SQL statements you provided
db.serialize(() => {
  // Run each statement one by one
  db.run(`
    CREATE TABLE Students (
      StudentID INTEGER PRIMARY KEY,
      FirstName TEXT,
      LastName TEXT,
      ContactInfo TEXT,
      EnrollmentStatus TEXT,
      AcademicYear INTEGER,
      GuardianInfo TEXT,
      CONSTRAINT UC_Student UNIQUE (FirstName, LastName)
    )
  `);

  db.run(`
    CREATE TABLE Guardians (
      GuardianID INTEGER PRIMARY KEY,
      FirstName TEXT,
      LastName TEXT,
      ContactInfo TEXT
    )
  `);

  db.run(`
    CREATE TABLE Teachers (
      TeacherID INTEGER PRIMARY KEY,
      FirstName TEXT,
      LastName TEXT,
      ContactInfo TEXT
    )
  `);

  db.run(`
    CREATE TABLE Classes (
      ClassID INTEGER PRIMARY KEY,
      ClassName TEXT,
      StartDate TEXT,
      EndDate TEXT,
      TeacherID INTEGER REFERENCES Teachers(TeacherID)
    )
  `);

  db.run(`
    CREATE TABLE Subjects (
      SubjectID INTEGER PRIMARY KEY,
      SubjectName TEXT
    )
  `);

  db.run(`
    CREATE TABLE Assignments (
      AssignmentID INTEGER PRIMARY KEY,
      AssignmentName TEXT,
      Date TEXT,
      MaxScore INTEGER,
      SubjectID INTEGER REFERENCES Subjects(SubjectID)
    )
  `);

  db.run(`
    CREATE TABLE Exams (
      ExamID INTEGER PRIMARY KEY,
      ExamName TEXT,
      Date TEXT,
      MaxScore INTEGER
    )
  `);

  db.run(`
    CREATE TABLE Quizzes (
      QuizID INTEGER PRIMARY KEY,
      QuizName TEXT,
      Date TEXT,
      MaxScore INTEGER
    )
  `);

  db.run(`
    CREATE TABLE Activities (
      ActivityID INTEGER PRIMARY KEY,
      ActivityName TEXT,
      Date TEXT,
      Description TEXT
    )
  `);

  db.run(`
    CREATE TABLE Quarters (
      QuarterID INTEGER PRIMARY KEY,
      QuarterName TEXT
    )
  `);

  db.run(`
    CREATE TABLE Gradebook (
      GradebookID INTEGER PRIMARY KEY,
      Score INTEGER,
      Comments TEXT,
      StudentID INTEGER REFERENCES Students(StudentID),
      AssignmentID INTEGER REFERENCES Assignments(AssignmentID),
      ExamID INTEGER REFERENCES Exams(ExamID),
      SubjectID INTEGER REFERENCES Subjects(SubjectID),
      QuizID INTEGER REFERENCES Quizzes(QuizID),
      ActivityID INTEGER REFERENCES Activities(ActivityID),
      QuarterID INTEGER REFERENCES Quarters(QuarterID)
    )
  `);
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Close the mydatabase database connection.');
  }
});