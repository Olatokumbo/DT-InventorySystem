const express = require("express");
const router = express.Router();
const basicAuth = require('express-basic-auth');
const db = require("../database");
router.use(basicAuth({
    users: { 'admin': 'supersecret' }
}))
// router.get("/cookie", (req, res) => {
//   res.cookie("foo", "bar", { signed: true }).send();
// });
// router.get("/", (req, res) => {
//   res.send(req.signedCookies);
// });


router.post("/signin", (req, res)=>{
    const {username, password} = req.body;
    const query = "SELECT * FROM users WHERE username=?";
    db.query(query, [username], (err, data)=>{
        if (err) throw err;
        else if(data.length<1)
        res.status(404).json({message: "Username not Found"}) 
        else{
            if(data[0].password===password){
                res.json({message: "Correct Password"})
            }
            else res.json({message: "Incorrect Password"})
        }
        
    })

})

module.exports = router;
