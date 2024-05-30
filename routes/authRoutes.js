/*
* Routing för inloggning
*/

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Anslut till mongoDB
const db = require("../models/Database");

// Användarmodell
const User = require("../models/User");

// Hämta alla användare
router.get("/users", async (req, res) => {
    try {
        let result = await User.find({});
        console.log(result); //Ta bort
        return res.json(result);
    } catch(error) {
        return res.status(500).json(error);
    }
});

// Kontrollera om användarnamn är upptaget
router.get("/users/user", async (req, res) => {
    try {
        const { username } = req.query;

        // Kontroller användarnamnet från query
        const existingUser = await User.findOne({ username: username });

        // Returnera om användare finns eller inte
        if(existingUser) {
            return res.json({ exists: true });
        } else res.json({ exists: false })
    } catch(error) {
        return res.status(500).json(error);
    }
});


// Lägg till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validera input
        if(!username || !password || !email || username.length < 5 || email.length < 10 || password.length < 5) {
            return res.status(400).json({ error: "Invalid username, email or password"})
        };

        // Korrekt - spara användare
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: "User created"})
    } catch(error) {
        res.status(500).json({ error: "Server error: " + error})
    }
});

// Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input
        if(username.length < 5 || password.length < 5) {
            return res.status(400).json({ error: "Invalid input - username and/or password is too short" })
        }

        // Kontrollera användarnamn
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: "Wrong username and/or password" });
        };

        // Kontrollera lösenord
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error: "Wrong username and/or password" });
        } else {
            // Skapa JWT
            const payload = { username: username};
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h"});
            const response = {
                message: "User logged in",
                token: token
            }
            res.status(200).json({ response });
        }
    } catch(error) {
        res.status(500).json({ error: "Server error: " + error })
    }
});



module.exports = router;