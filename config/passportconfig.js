const LocalStrategy = require("passport-local").Strategy
const Users = require("../models/Users")
const bcrypt = require("bcryptjs")

function initpassport(passport){
    passport.use(new LocalStrategy(async(username, password, done)=>{
        let user = await Users.findOne({username: username})

        if(!user){
            return done(null, false, {message: "user does not exist"})
        }
        else{
             let isMatch = await bcrypt.compare(password, user.password)

            if(isMatch){
                return done(null, user)
            }else{
                return done(null, false, {message: "password is incorrect"})
            }
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user)
    })
    passport.deserializeUser((user, done)=>{
        done(null, user)
    })
}

module.exports = initpassport