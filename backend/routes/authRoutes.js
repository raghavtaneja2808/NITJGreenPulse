const { default: mongoose } = require("mongoose");
module.exports=(app)=>{
    const User=mongoose.model("users");
    const bcrypt=require('bcryptjs');
const passport=require("passport")
app.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));

app.get('/auth/google/callback',passport.authenticate('google'),
(req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/chat`);
  });
app.get('/api/current_user',(req,res)=>{
    console.log("Accessing current user request recieved",req.user);
    res.send(req.user);
}
)
app.get("/check-session", (req, res) => {
    console.log("Session data:", req.session);
    res.send(req.session);
});

app.get("/api/logout", (req, res, next) => {
  req.logout((err) => {
      if (err) {
          return next(err); // Pass error to Express error handler
      }
      console.log("logout successfull");
      res.send({ message: true });
  });
});

}
