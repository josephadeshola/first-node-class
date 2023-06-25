// const { response } = require('express')
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const URI = "mongodb+srv://adesholajoseph99:Kinstar125d@cluster0.alugxvk.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(URI)
    .then(() => {
        console.log("mongoose sucessful");
    })
    .catch((err) => {
        console.log("err");
    })

let userSchema = {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

}

// to save to database and go to post request
let userModel = mongoose.model('users_collection', userSchema)

// previous way
// mongoose.connect(URL,()=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("connect successful");
//     }
// })

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // console.log("request made")
    // response.send([{name:"Ayomide", club:"chelsea"}])
    // res.send([
    //     {name:"ayo",age:20},
    //     {name:"doe",age:30},
    //     {name:"too",age:15}
    // ])
    // console.log(__dirname);
    res.sendFile(__dirname + "/index.html")
})

app.get("/signup", (req, res) => {
    res.render("signup", { message: "" })
})
app.get("/index", (req, res) => {
    res.render("index", { message: "" })
})
app.get("/dashboard", (req, res) => {
    userModel.find()
    .then((response)=>{
            console.log(response);
            res.render("dashboard",{response})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get("/firstpage",(req,res)=>{
    res.render("firstpage")
})

app.get("/ayomide",(req,res)=>{
    res.render("ayomide")
})

app.get("/student_collections/get",(req,res)=>{
    student_collections.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })

})

app.post("/signup", (req, res) => {
    console.log(req.body);
    let form = new userModel(req.body)
    form.save()
        .then(() => {
            console.log("good");
            res.redirect("/index")
            // res.render("signup", { message: "Signup successful" })
        })
        .catch((err) => {
            if (err.code === 11000) {
                console.log(err.code);
                res.render("signup", { message: "Eamil already exist" })
            }
            else {
                res.render("signup", { message: "This field is required" })
            }
        })
})
app.post("/delete",(req,res)=>{
    userModel.findOneAndDelete({email:req.body.userEmail})
    .then((response)=>{
        console.log(response);
           res.redirect("dashboard")

    })
})

app.post("/edit",(req,res)=>{
    userModel.findOne({email:req.body.userEmail})
    .then((response));
    console.log(response);
    res.render("edituser",{response})
})

app.post("/update",(req,res)=>{
    let id=req.body.id
    userModel.findByIdAndUpdate(id,req.body)
    .then((response)=>{
        console.log(response);
        res.redirect("/")

    })
    .catch((err)=>{
        console.log(err);
    })

})

app.post("/index", (req, res) => {

        //     const {email, password} = req.body
        //    const user = await userModel.findOne({email})
        //     // userModel.find({email:req.body.email,password:req.body.password})

        //    if(user.password === password) {
        //     console.log(user)
        //     res.redirect("dashboard")
        //    } else {
        //     console.log('no user')
        //    }  

    userModel.find({ email: req.body.email, password: req.body.password })
        .then((response) => {

            if (response.length > 0) {
                res.redirect("dashboard")
            }
            else {
                res.render("index", { message: "Incorrect email or password" })
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

app.listen(5000, () => {
    console.log("server dy work")
})
// app.get("/",(require,response)=>{
    // console.log("request made")
    // response.send([{name:}])2wq
// })