// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const UserTest = require("../models/User"); // Ensure correct model import

// List all users from userstest table
router.get('/', async (req, res) => {
    try {
        const users = await UserTest.findAll({
            where :{
                isActive:true
            }
        });
        res.json(users);
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).send('Error retrieving users');
    }
});

// POST route to check username and password
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists in database
        const user = await UserTest.findOne({
            where: {
                username: username,
                password: password // Note: In production, use hashed password comparison
            }
        });

        if (user) {
            // User exists, return success message
            res.status(200).json({ message: 'User exists' });
        } else {
            // User does not exist or incorrect credentials
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route to check username and password
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login request received:', username, password);
    try {
        // Check if user exists in database
        const user = await UserTest.findOne({
            where: {
                username: username,
                password: password // Note: In production, use hashed password comparison
            }
        });

        if (user) {
            // User exists, return success message
            res.status(200).json({ message: 'User exists' });
        } else {
            // User does not exist or incorrect credentials
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
