const express = require ("express")
const server = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require ("cors")


dotenv.config()
 server.use (cors())
 server.use(express.json())


const port = process.env.PORT


mongoose.connect("mongodb+srv://evebabe:ub021299@cluster0.znmxg.mongodb.net/test",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(
    server.listen(port, ()=>{
        console.log(`something is running on port ${port}`)
    })
    
).catch(error => console.log(error)

)



