// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");

// const app = express();
// dotenv.config();

// const port = process.env.PORT || 3000;


// //connecting mongo

// const username = process.env.MONGODB_USERNAME;
// const password = process.env.MONGODB_PASSWORD ;

// // mongoose.connect(`mongodb+srv://<username>:<password>@cluster0.dtgjc1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` , {
//     mongoose.connect(`mongodb+srv://Jaskirat_2000:mxYEhaurufurwMCn@cluster0.dtgjc1f.mongodb.net/registrationFormDB` , {
//     useNewUrlParser : true,
//     useUnifiedTopology : true,

// });

// //registrationschema
// const registrationSchema = new mongoose.Schema({
//     name : String,
//     email : String,
//     password: String

// })

// //mode of registration schema
// const Registration = mongoose.model("Registration", registrationSchema);
// app.use(bodyParser.urlencoded ({ extended: true}));
// app.use(bodyParser.json());



// app.get("/",(req, res) => {
//     res.sendFile(__dirname + "/pages/membership.html");

// })

// app.post("/register",async (req, res)=>{
//     try{
//         const {name, email, password} = req.body;

//         const registrationData = new Registration({
//             name,
//             email,
//             password
//         });
//         await registrationData.save();
//         res.redirect("/success");

 
//     }
//     catch{
//         console.log(error);
//         res.redirect("error");

//     }
// })

// app.get("/success", (req, res)=>{
//     res.sendFile (__dirname+ "/pages/solution1.html");
// })


// app.listen(port, ()=>{
//     console.log(`server is running on port ${port}`);
// })




 

if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}


const express = require('express')
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
const path = require('path');


const port = process.env.PORT || 3000;

// Connecting to MongoDB

// const username = process.env.MONGODB_USERNAME;
// const password = process.env.MONGODB_PASSWORD ;

mongoose.connect("mongodb+srv://gouravjio80:gouravthakur2002@cluster0.dtgjc1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Registration Schema
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
plan: String,
});


// Model for Registration Schema
const Registration = mongoose.model("Registration", registrationSchema);





app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function (req, res) {
  res.render("index");
})


app.get('/index', function (req, res) {
  res.render("index");
})

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, plan } = req.body;

    if (!name || !email || !password || !plan) {
      return res.status(400).send("Please provide name, email, password, and select plan");
    }

    const registrationData = new Registration({
      name,
      email,
      password,
      plan
    });

    await registrationData.save();
    // Redirect to success page upon successful registration
    res.redirect("/success");
  } catch (error) {
    console.error(error);
    res.redirect("/error");
  }
});

app.get('/success', function (req, res) {
  res.render("solution1");
})

app.get('/basicCourse', function (req, res) {
  res.render("basicCours");
})


app.get('/join', function (req, res) {
  res.render("join");
})
app.get('/membership', function (req, res) {
  res.render("membership");
})

app.get('/menCourse', function (req, res) {
  res.render("menCourse");
})
app.get('/payment', function (req, res) {
  res.render("payment");
})
app.get('/womenCourse', function (req, res) {
  res.render("womenCourse");
})




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




