const express = require("express");

const auth = (req, res, next) =>{
    if (req.session.loggedin)
    next();
    else
    res.status(401).json({
        message: "User is not logged in"
    })
}

module.exports = auth;