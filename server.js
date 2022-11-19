const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const session = require("express-session")
const flash = require("express-flash")
const initpassport = require("./config/passportconfig")
const {isLoggedIn, isLoggedOut} = require("./config/auth")
const Users = require("./models/Users")
const Refdata = require("./models/Referal")
const History = require("./models/History")
const Deposits = require("./models/Deposits")


initpassport(passport)

const app = express()


app.use(express.static("./public"))
app.use(express.json())
app.use(flash())
app.use(session({
    cookie:{
    secure: false,
    maxAge:6000000
       },
    secret: process.env.SESSION_KEY || "hidelater", //hide this later
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')

mongoose.connect(process.env.DB || "mongodb://localhost/dar")

const port = process.env.PORT || 3000

//base(index) route
app.get("/", isLoggedOut, (req, res)=>{
    res.render("index")
})

//about company get route
app.get("/about", isLoggedOut, (req, res)=>{
    res.render("about")
})

//faq get route
app.get("/faq", isLoggedOut, (req, res)=>{
    res.render("faq")
})

//terms get route
app.get("/terms", isLoggedOut, (req, res)=>{
    res.render("terms")
})

//login get route
app.get("/login", isLoggedOut, (req, res)=>{
    res.render("login", {msg: ""})
})

//register get route
app.get("/signup", isLoggedOut, async (req, res)=>{
    let upline = await Users.findOne({username: req.query.ref})
    console.log(upline)
    res.render("register", {msg: "", referrer: upline ? upline.username : ""})
})

//contact us get route
app.get("/support", isLoggedOut, (req, res)=>{
    res.render("support")
})

//forgot password get route
app.get("/passwordforgot", isLoggedOut, (req, res)=>{
    res.render("forgotpassword")
})

app.get("/dashboard", isLoggedIn, async (req, res)=>{
    let history
    let depositreq = await Deposits.find({status: "pending"})
    let refdata = await Refdata.findOne({userid: req.user._id})
    if(req.query.page == "history"){
        history = await History.find({userid: req.user._id, type:req.query.type})

    }
    res.render("dashboard", {page: req.query.page, userdetails: req.user, refdata: refdata, history: history, type: req.query.type, depositreq: depositreq})
})

//post routes start here
app.post("/registerdar", async (req, res)=>{

    let usersname = await Users.findOne({username: req.body.username})
    let usersmail = await Users.findOne({email: req.body.email})
    let referrer
    if(req.body.upline){
        referrer= await Users.findOne({username: req.body.upline})  
    }


    if(req.body.fullname.length < 3 || req.body.fullname.length > 50){
        regerror("name length is out of range")
    }else if(usersname){
        regerror("user with username already exists")
    }else if(req.body.username.length < 3 || req.body.username.length > 50){
        regerror("Username length is out of range")
    }
    else if(usersmail){
        regerror("user with email already exists")
    }else if(!req.body.email){
        regerror("enter user email")
    }
    else if(req.body.tac != "on"){
        regerror("you must agree to our terms and conditions")
    }else if(req.body.password != req.body.confirmpass){
        regerror("your passwords don't match")
    }else{
        console.log("registered successfully:", req.body)
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                let saveuser =  await new Users({
                    fullname: req.body.fullname,
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    account: {
                        deposits: {
                            amount:  0.00,
                            name: "Deposits",
                            description: "Total amount invested"
                        },
                        withdraws: {
                            amount:  0.00,
                            name: "Withdraws",
                            description: "total amount withdrawn"
                        },
                        activedeposits: {
                            amount: 0.00,
                            name:  "Active Deposits",
                            description: "Total active invest"
                        },
                        currentballance: {
                            amount: 0.00,
                            name:  "Current Ballance",
                            description: "Total withdrawable ballance"
                        }
                    }
                })
        
                saveuser = await saveuser.save()

                //referral related logic

                if(referrer){
                    let referrerdata = await Refdata.findOne({userid: referrer._id})
                     referrerdata.yourrefs.push(saveuser.username)

                    referrerdata = await referrerdata.save()
                    console.log(referrerdata.yourrefs)
                }

                await new Refdata({
                    userid: saveuser._id,
                    referrer: referrer ? referrer.username : "" ,
                    reflink: `https://dormantaccountrefunds.org/signup?ref=${saveuser.username}`
                }).save()
                console.log(saveuser)
                res.redirect("/login")
            });
        });
     
    }

    function regerror(errmsg){
        res.render("register",{msg: errmsg, referrer: referrer ? referrer.username : ""})
    }
})

//loging in users
app.post("/logindar", passport.authenticate("local", {
    failureRedirect: "/login", 
    failureFlash: true
}), async (req, res)=>{
    let user = await Users.findOne(req.user._id)
    user.lastLoggedIn = new Date()
    await user.save()
    res.redirect("/dashboard")
}
)

//deposit post route
app.post("/depositfunds", async (req, res)=>{
    console.log(req.body)
    let deposit = new Deposits({
        user: req.user.username,
        plan: req.body.plan,
        currency: req.body.currency,
        amount: req.body.amount,
        status: "pending"
    })

    deposit = await deposit.save()
    res.redirect("/dashboard")
})

//logout
app.post("/logout", (req, res)=>{
    req.logout((err)=>{
        res.redirect("/")
    })
})


app.listen(port, ()=>{console.log(`app listening on port ${port}`)})