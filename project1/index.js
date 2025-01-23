const express = require("express");
const users = require("./MOCK_DATA.json")
const fs=require("fs");
const app = express();
const mongoose= require("mongoose");

const PORT = 8000;

//connection

mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=> console.log("Connected"))
.catch((err)=> console.log("Mongo Error",err))

const userSchema =new mongoose.Schema({

firstName : { type : String , required : true },
lastName : { type : String , required : true },
email : { type : String , required : true , unique: true},
jobTitle : { type : String , required : true },
jobTitle : { type : String , required : true },

})

const User = mongoose.model("user",userSchema);

app.use(express.urlencoded({extended : false}));

app.use((req,res,next)=>{                //middleware 1
    console.log("Hello from m1");
    req.myUsername = "nitin.dev";
    next();
})

app.use((req,res,next)=>{                //middleware 2
    console.log("Hello from m2",req.myUsername);
    next();
})

//routes

app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    
    res.send(html);
});


// agar koi mobile dev khole
//dynamic path parameters



app.get("/api/users",(req,res)=>
    {
        res.setHeader("myname","Nitin");
        return res.json(users);
    })

app.route("/api/users/:id")

.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ error: "User not found" }); // Fixed: Properly formatted error response as an object
    }

    return res.json(user);
})
.patch((req,res)=>
{
    //edit user with id

})
.delete((req,res)=>
{
    //delete
})

app.post("/api/users",async (req,res)=>
    {
    
        //add a user
    const body = req.body;

    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title ) {return res.status(400).json({msge : "All field are required"})};
    
    const result = await User.create({

        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title,
    })


    });

app.listen(PORT, ()=> {
    console.log("Server started")
})