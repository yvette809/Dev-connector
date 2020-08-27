const express = require ("express");
const profileRouter = express.Router();
const ProfileModel = require("./models/profileSchema")
const UserModel = require('./models/userSchema')
const auth = require('../../routes/api/middleware/auth')

// @route GET api/profile/me
// @desc get current users profile
// @access private
profileRouter.get("/me", auth , async(req,res,next)=>{
    try{
        const profile = await  ProfileModel.findOne({user:req.user.id}).populate('user',['name', 'avatar'])
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'})
        }else{
            res.json(profile)
        }
    }catch(error){
        next(error)
    }

})

//@route   POST api/profile
// @desc create or update user profile
// @access  private

profileRouter.post("/", async(rew,res,next)=>{

})




module.exports = profileRouter