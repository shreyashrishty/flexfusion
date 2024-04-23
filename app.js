if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require('express')
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
const path = require('path');
const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI , {
  
}).then(() => {
  console.log(`Connection to MongoDB successful`);
}).catch((error) => {
  console.error(`Error connecting to MongoDB: ${error}`);
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
  res.render("basicCourse");
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
app.get('/login', function (req, res) {
  res.render("login");
})
app.get('/register', function (req, res) {
  res.render("register");
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});