const express = require ("express")
const listEndpoints = require("express-list-endpoints")
const userRouter = require("./routes/api/users")
const authRouter = require("./routes/api/auth")
const profileRouter = require("./routes/api/profile")
const postRouter = require("./routes/api/posts")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require ("cors")

const {
    badRequestHandler,
    forbiddenHandler,
    notFoundHandler,
    genericErrorHandler,
} = require ("./routes/errorHandler")


 dotenv.config()

 const server = express()
 console.log(listEndpoints(server))
 server.use(express.json()) 
 server.use (cors())


 server.use("/api/users", userRouter)
 server.use("/api/auth", authRouter)
 server.use("/api/profile", profileRouter)
 server.use("/api/post", postRouter)

 server.use(badRequestHandler)
server.use(forbiddenHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)


const port = process.env.PORT 


mongoose.connect("mongodb+srv://evebabe:ub021299@cluster0.znmxg.mongodb.net/Dev-connect",{
    useNewUrlParser:true,
    useUnifiedTopology:true
   
})
.then(
    server.listen(port, ()=>{
        console.log(`something is running on port ${port}`)
    })
    
).catch(error => console.log(error)

)



