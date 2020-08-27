const express = require ("express");
const authRouter = express.Router();
const bcrypt = require ("bcryptjs")
const auth = require ('../../routes/api/middleware/auth')
const jwt = require("jsonwebtoken")
const UserModel = require("./models/userSchema");
const UsersModel = require("./models/userSchema");
// @route GET api/auth
// @desc Test route
// @access public

authRouter.get("/", auth, async(req,res,next)=>{
    try{
        const user = await UsersModel.findById(req.user.id).select ('-password')
        if(user){
        res.json(user);

        }else{
            const error = new Error("user not found")
            error.httpStatusCode =404
            next(error)

        }

    }catch(error){
        next(error)
    }

})

// login user
// @route POST api/auth
//@desc    Authenticate user and get a token
// @ access public
authRouter.post("/", async(req,res, next)=> {
    
    const {email,password} = req.body;
    try{
          // see if user exists
       let user = await UserModel.findOne({email});
       if(!user){
           res.status(400).json({errors:[{msg:"invalid credentials"}]})
       }else{

         const isMatch = await bcrypt.compare(password,user.password)
         if(!isMatch){
            res.status(400).json({errors:[{msg:"invalid credentials"}]})

         }

         // Return jsonwebtoken
         const payload ={
             user:{
                 id:user.id
             }
         }
         jwt.sign(payload,process.env.jwt_Secret, {expiresIn:360000} ,(err,token)=>{
             if(err){
                 throw err
             }else{
                res.json({token})
            }
         })

       };


    }catch(error){
        next(error)
    }
})





module.exports =  authRouter