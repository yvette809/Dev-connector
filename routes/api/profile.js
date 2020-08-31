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

profileRouter.post("/", auth,async(req,res,next)=>{

    const{
        company,
        website,
        location,
        bio,
        status,
        githuusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company)  profileFields.company= company;
    if(website)  profileFields.website= website;
    if(location)  profileFields.location= location;
    if(bio)  profileFields.bio= bio;
    if(status)  profileFields.status= status;
    if(githuusername)  profileFields.githuusername= githuusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill =>skill.trim())
    }
    console.log(profileFields.skills)

    // build socil object
    profileFields.social = {}
    if(youtube)profileFields.social.youtube= youtube;
    if(twitter)profileFields.social.twitter= twitter;
    if(facebook)profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram)profileFields.social.instagram = instagram;

    try{

        let profile = await ProfileModel.findOne({user:req.user.id})
        if(profile){
            //update
            profile = await profile.findOneAndUpdate({user:req.user.id}, {$set:profileFields},{new:true})
            return res.json(profile)

        }else{
            // create profile
            const profile= new ProfileModel(profileFields)
            await profile .save()
            res.json(profile)
        }

    }catch(error){
        next(error)
    }

})



//@route   GET api/profile
// @desc Get all profiles
// @access  public

profileRouter.get("/", async(req,res,next)=>{
    try{

    }catch(error){
        next(error)
    }
})




module.exports = profileRouter