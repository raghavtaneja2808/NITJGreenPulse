const passport=require("passport");
const mongoose=require("mongoose");
const User=mongoose.model("users");
const bcrypt=require('bcryptjs')
const GoogleStrategy=require('passport-google-oauth20').Strategy;
passport.serializeUser((user,done)=>{
    console.log("Serializing User: ",user)
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    console.log("Desrializing User",id)
    User.findById(id).then(user=>{done(null,user)})
})

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:`${process.env.SERVER_URL}/auth/google/callback`
},async (accessToken,refreshToken,profile,done)=>{
    console.log(profile)
    const user=await User.findOne({googleID:profile.id})
    if(!user){  const user=await new User({googleID:profile.id,email:profile.emails[0].value,password:profile.id,name:profile.displayName,verified:true,photo:profile._json?.picture}).save() 
        done(null,user) }
    else{done(null,user)};console.log(user);


}))
