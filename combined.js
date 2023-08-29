const express = require('express');
const mongoose = require('mongoose');
const md5 = require('md5');
const path = require('path');
const bodyParser = require('body-parser');
const Student = require('./models/Student'); // Import your Student model

const app = express();

app.use(bodyParser.json());

// Connect to authDB
const authDBConnection = mongoose.createConnection('mongodb+srv://syedmuzammil1118:syed@cluster0.rjd0utj.mongodb.net/authDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

authDBConnection.on('open', () => {
  console.log('Connected to authDB');
  // Once authDB is connected, connect to StudentsDB
  mongoose.connect('mongodb+srv://syedmuzammil1118:syed@cluster0.rjd0utj.mongodb.net/StudentsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to StudentsDB');
    startServer(); // Start the server after both connections are established
  }).catch(err => {
    console.error('Error connecting to StudentsDB:', err);
  });
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = authDBConnection.model('User', userSchema); // Use the authDBConnection to create the User model

app.use(express.static(path.join(__dirname, 'public')));

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      console.log(`Comparing user input password: ${password}`);
      console.log(`With stored hashed password: ${user.password}`);

      if (md5(password) === user.password) {
        res.json({ message: 'Authentication successful' });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});



// Fetch student details route
// Fetch student details route
app.get('/student', async (req, res) => {
  const studentID = req.query.studentID;

  try {
    const student = await Student.findOne({ studentID });
    if (student) {
      const { studentID, name, phone, age, Section, fatherName, fatherMobile, branch } = student;
      res.json({ studentID, name, phone, age, Section, fatherName, fatherMobile, branch }); // Include the additional fields
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving student data' });
  }
});

function startServer() {
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
