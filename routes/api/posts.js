const express = require ("express");
const postRouter = express.Router();

// @route GET api/posts
// @desc Test route
// @access public
postRouter.get("/", (req,res)=> res.send('user route'))




module.exports =  postRouter