const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require("../database");
require('dotenv').config();


router.post("/signin", (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username=?";
    db.query(query, [username], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        }
        else if (data.length < 1)
            res.status(404).json({ message: "Incorrect email or password" })
        else {
            if (data[0].password === password) {
                // res.json({ message: "Correct Password" })
                // Issue token
                const payload = { username };
                const token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: '1h'
                });
                res.cookie('token', token, { httpOnly: true })
                    .sendStatus(200);
            }
            else  res.status(404).json({ message: "Incorrect email or password" })
        }

    })

})


module.exports = router;
