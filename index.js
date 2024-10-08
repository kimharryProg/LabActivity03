// Import the Express library
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ error: 'Something went wrong!' }); 
});

// Array to store user data
const users = [];

// Helper function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Route to handle GET requests
app.get('/users', (req, res) => {
    console.log('GET /users endpoint was accessed'); 
    res.status(200).json(users);
});

// Route to handle POST requests
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({error: 'Invalid email format'});
    }

    // Check for missing fields
    if (!name || !email || !password) {
        return res.status(400).json({error: 'ALL fields are required'});
    }

    // Validate password length (password should be at least 6 characters)
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Add user to the users array
    users.push({ name, email, password });
    console.log(`POST /users endpoint was accessed: ${JSON.stringify(users)}`);
    res.status(201).json({ message: 'User registered successfully' });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
