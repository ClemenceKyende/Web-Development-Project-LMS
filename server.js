const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Configure session middleware
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'clemencekyende',
    password: 'cLEmence2@#$',
    database: 'learning_management_app'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

// Serve static files from the default directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up middleware to parse incoming JSON data
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
    // Serve index.html file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define routes for course selection
app.post('/select-courses', (req, res) => {
    // Add your course selection logic here
    // Retrieve selected courses from request body
    const selectedCourses = req.body.courses;
    // Process selected courses and perform necessary actions
});

// Define login route
app.post('/login', (req, res) => {
    // Add your login logic here
    // Retrieve username and password from request body
    const { username, password } = req.body;
    // Check credentials and authenticate user
    // Redirect or send appropriate response
});

// Define logout route
app.post('/logout', (req, res) => {
    // Add your logout logic here
    // Destroy session or clear session data
    // Redirect or send appropriate response
});

// Define a User representation for clarity
const User = {
    tableName: 'users',
    createUser: function (newUser, callback) {
        connection.query('INSERT INTO ' + this.tableName + ' SET ?', newUser, callback);
    },
    getUserByEmail: function (email, callback) {
        connection.query('SELECT * FROM ' + this.tableName + ' WHERE email = ?', email, callback);
    },
    getUserByUsername: function (username, callback) {
        connection.query('SELECT * FROM ' + this.tableName + ' WHERE username = ?', username, callback);
    }
};

// Registration route
app.post('/register', async (req, res) => {
    try {
        // Log the request body
        console.log('Request Body:', req.body);

        // Define default values for email and username if they are missing
        const email = req.body.email || 'default_email@example.com';
        const username = req.body.username || 'default_username';

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Create a new user object
        const newUser = {
            email: email,
            username: username,
            password: hashedPassword,
            full_name: req.body.full_name
        };

        // Insert user into MySQL
        User.createUser(newUser, (error, results, fields) => {
            if (error) {
                console.error('Error inserting user: ' + error.message);
                // If registration failed, send a failure response
                return res.status(400).json({ message: 'Registration failed' });
            }
            console.log('Inserted a new user with id ' + results.insertId);
            // If registration successful, send a success response
            res.status(201).json({ message: 'Registration successful' });
        });
    } catch (error) {
        console.error('Error registering user: ' + error.message);
        // If an internal server error occurred, send a 500 response
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
