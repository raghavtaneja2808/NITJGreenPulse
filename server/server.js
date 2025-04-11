const express=require("express");
const mongoose=require("mongoose");
const keys = require("./config/keys");
const cors=require("cors");
const session=require("express-session");
const passport = require("passport");
require("dotenv").config();
const app=express();
app.use(express.json())

app.use(cors({credentials: true, 
  origin: keys.client_url||"http://localhost:3000"}))

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30*24*60*60*1000 },
  })
);
app.use(passport.initialize())
app.use(passport.session())
require("./models/user.js");
require("./services/passport.js")
mongoose.connect(keys.mongo_url).then(()=>console.log("DB connected"));
require('./routes/authRoutes.js')(app);
PORT=5000||process.env.PORT
app.listen(PORT,()=>console.log("Server running at PORT: ",PORT));