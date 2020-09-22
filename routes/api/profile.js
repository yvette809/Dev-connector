const express = require("express");
const profileRouter = express.Router();
const request = require("request");
const ProfileModel = require("./models/profileSchema");
const UserModel = require("./models/userSchema");
const PostModel = require("./models/postSchema");
const auth = require("../../routes/api/middleware/auth");
// const postRouter = require("./posts");
// const { body } = require("express-validator");


// @route GET api/profile/me
// @desc get current users profile
// @access private
profileRouter.get("/me", auth, async (req, res, next) => {
  try {
    const profile = await ProfileModel.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    } else {
      res.json(profile);
    }
  } catch (error) {
    next(error);
  }
});

//@route   POST api/profile
// @desc create or update user profile
// @access  private

profileRouter.post("/", auth, async (req, res, next) => {
  const {
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
    linkedin,
  } = req.body;

  // build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githuusername) profileFields.githuusername = githuusername;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }
  console.log(profileFields.skills);

  // build socil object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await ProfileModel.findOne({ user: req.user.id });
    if (profile) {
      //update
      profile = await profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    } else {
      // create profile
      const profile = new ProfileModel(profileFields);
      await profile.save();
      res.json(profile);
    }
  } catch (error) {
    next(error);
  }
});

//@route   GET api/profile
// @desc Get all profiles
// @access  public

profileRouter.get("/", async (req, res, next) => {
  try {
    const profiles = await ProfileModel.find().populate("user", [
      "name",
      "avatar",
    ]);
    if (profiles.length < 0) {
      const error = new Error("profiles not found");
      error.httpStatusCode = 404;
      nexxt(error);
    } else {
      res.status(200).send(profiles);
    }
  } catch (error) {
    next(error);
  }
});

//@route   GET api/profile/user/:user_id
// @desc Get profile by user id
// @access  public

profileRouter.get("/user/:user_id", async (req, res, next) => {
  try {
    const profile = await ProfileModel.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (profile) {
      return res.status(200).send(profile);
    } else {
      const error = new Error("there is no profile for this user");
      error.httpStatusCode = 404;
      nexxt(error);
    }
  } catch (error) {
    next(error);
  }
});

//@route   Delete api/profile
// @desc delete profile, user and posts
// @access  private

profileRouter.delete("/", auth, async (req, res, next) => {
  try {
    // remove profile
    await ProfileModel.findOneAndRemove({ user: req.user.id });

    // remove user
    await UserModel.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "user deleted" });
  } catch (error) {
    next(error);
  }
});

//@route   PUT api/profile/experience
// @desc add profile experience
// @access  private

profileRouter.put("/experience", auth, async (req, res, next) => {
  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id });

    // experience is a key in the profile model. we use unshift instead of push because we want to add the experience in the beginning of the array.
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

//@route   PUT api/profile/experience/:exp_id
// @desc delete experience from profile
// @access  private

profileRouter.delete("/experience/:exp_id", auth, async (req, res, next) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

//@route   PUT api/profile/education
// @desc add profile education
// @access  private

profileRouter.put("/education", auth, async (req, res, next) => {
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id });

    // education is a key in the profile model. we use unshift instead of push because we want to add the experience in the beginning of the array.
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

//@route   PUT api/profile/education/:edu_id
// @desc delete education from profile
// @access  private

profileRouter.delete("/education/:edu_id", auth, async (req, res, next) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

//@route   GET api/profile/github/:username
// @desc Get profiles from github
// @access  public

profileRouter.get("/github/:username", (req, res, next) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.client_id}&client_secret=${process.env.github_secret}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
       return res.status(404).json({ msg: "No github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    next(error);
  }
});

profileRouter.delete("/", auth, async(req,res)=>{
  try{
    //remove user posts
    await PostModel.deleteMany({user:req.user.id})
    // remove profile
    await  ProfileModel.findOneAndRemove({user:req.user.id})
    // remove user
    await UserModel.findOneAndRemove({_id:req.user.id})

    res.json({msg:"user deleted"})
  }catch(err){
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})
module.exports = profileRouter;
