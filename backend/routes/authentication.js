const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require("../database");
require('dotenv').config();


router.get("/getToken", (req, res) => {
    const user = "admin"
    jwt.sign({user}, process.env.SECRET_KEY, { expiresIn: '30s' }, (err, token) => {
        res.json({
          token
        });
      });

})


module.exports = router;
