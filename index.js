const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
let express=require("express")
let mongoose=require("mongoose")
let app=express()
require("dotenv").config()
let cors=require("cors")

app.use(express.json())



app.use(cors({
    origin:"*"
}))
app.use(cookieParser())
app.use(bodyParser.json())
//importation Router
let UserRouter= require("./routes/user.Router")

app.get('/',async(req,res)=>{
    res.send("Welcom to my app")
})
app.use('/api',UserRouter)
let Port=process?.env?.Port || 3010

//connect to mongodb
mongoose.set('strictQuery',true)
mongoose.connect(process?.env?.mongo_url,{
    useNewUrlParser:true,
    useUniFiedTopology:true

},
    (error)=>{
    let db=mongoose.connection;
    if(error){
        db.on("error",console.log.bind(console),"mongoDb error connection")

    }else{
        console.log("connect to MongoDb")
    }
    
})

app.listen(Port,async()=>{
console.log("server is running on port",Port)
}
)
