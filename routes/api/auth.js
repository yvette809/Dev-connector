const express = require ("express");
const authRouter = express.Router();

// @route GET api/auth
// @desc Test route
// @access public
authRouter.get("/", (req,res)=> res.send('user route'))




module.exports =  authRouter