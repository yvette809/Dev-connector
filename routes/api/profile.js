const express = require ("express");
const profileRouter = express.Router();

// @route GET api/users
// @desc Test route
// @access public
profileRouter.get("/", (req,res)=> res.send('user route'))




module.exports = profileRouter