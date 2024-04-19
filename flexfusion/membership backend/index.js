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








const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();



const port = process.env.PORT || 3001;

// Connecting to MongoDB




const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD ;

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



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password ,plan} = req.body;

    if (!name || !email || !password|| !plan) {
        return res.status(400).send("Please provide name, email,  and password and select plan");
      }
  

    const registrationData = new Registration({
      name,
      email,
      password,
      plan
    });

    await registrationData.save();
    res.redirect("/success");
  } catch (error) {
    console.error(error);
    res.redirect("/error");
  }
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/pages/solution1.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


 