const express = require ("express");
const postRouter = express.Router();
const auth = require("../../routes/api/middleware/auth");
const PostModel = require("./models/postSchema")
const UserModel = require("./models/userSchema")
const ProfileModel = require("./models/profileSchema")


// @route GET api/posts
// @desc Test route
// @access private
postRouter.post("/", auth, async (req,res,next)=> {
    try {
        const user  = await UserModel.findById(req.user.id).select('-password');
        const newPost = new PostModel({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
    
        })

        const post = await newPost.save()
        res.json(post)
    } catch (error) {
        next(error)
        
    }
   
})


// @route GET api/posts
// @desc get all posts
// @access private

postRouter.get("/", auth, async(req,res,next)=>{
    try{
        const posts = await PostModel.find(req.query).sort({date:-1})
        res.json(posts)

    }catch(error){
        next(error)
    }
})

// @route GET api/posts/:id
// @desc get post by id
// @access private

postRouter.get("/:id", auth, async(req,res,next)=>{
    try {
        const post = await PostModel.findById(req.params.id).sort({date:-1})
        if(post){
            return res.status(200).json(post);
        }else{
            const error = new Error()
            error.httpStatusCode=404
            next(error)
        }
       
        
    } catch (error) {
        next(error)
        
    }
})

// @route delete api/posts/:id
// @desc delete a post 
// @access private

postRouter.delete("/:id", auth,async(req,res,next)=>{
    try{
        const post = await PostModel.findById(req.params.id);

        // check user. We convert the post id to string
        if(!post){
            return res.status(404).json({msg: 'post not found'})
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg:'user not authorized'})
        }

        await post.remove();
        res.json({msg: 'post removed'})

    }catch(error){
        next(error)
    }
})

// @route PUT api/posts/like/:id
// @desclike a post 
// @access private

postRouter.put('/like/:id', auth, async(req,res,next)=>{
    try {

        const post = await PostModel.findById(req.params.id)
        // check if post has already been liked
        if(post.likes.filter(like=>like.user.toString()=== req.user.id ).length >0){
            return res.status(400).json({msg:'post has already been liked'})
        } else{
            post.likes.unshift({user:req.user.id})
        }

        await post.save()
        res.json(post.likes)
        
    } catch (error) {
        next(error)
    }
})


// @route PUT api/posts/like/:id
// @desclike a post 
// @access private

postRouter.put('/unlike/:id', auth, async(req,res,next)=>{
    try {

        const post = await PostModel.findById(req.params.id)
        // check if post has already been liked
        if(post.likes.filter(like=>like.user.toString()=== req.user.id ).length ===0){
            return res.status(400).json({msg:'post has not yet been liked'})
        } else{
            //get removeindex

            const removeIndex = post.likes.map(like=> like.user.toString()).indexOf(req.user.id)
            post.likes.splice(removeIndex,1)

        await post.save()
        res.json(post.likes)
        }
        
        
    } catch (error) {
        next(error)
    }
})

module.exports =  postRouter