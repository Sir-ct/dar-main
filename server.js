require("dotenv").config()

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
const Withdraws = require("./models/Withdraws")
const ResetPassword = require("./models/Resetpassword")
const {sendMail} = require("./utils/mail")
const { welcomeMail, depositMail, withdrawMail, cancelWithdrawMail, resetPasswordMail } = require("./utils/mailTemplates")


initpassport(passport)

const app = express()

app.set("trust proxy", 1)

app.use(express.static("./public"))
app.use(express.json())
app.use(flash())
app.use(session({
    cookie:{
    secure: true,
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
    res.render("forgotpassword", {message: ""})
})

app.get("/dashboard", isLoggedIn, async (req, res)=>{
    let user = await Users.findById(req.user._id)
    let allUsers = await Users.find()
    let history
    let depositreq = await Deposits.find({status: "pending"})
    let changepassreq = await ResetPassword.find()
    let approveddep = await Deposits.find({status: "approved"})
    let canceledwithdraws = await Withdraws.find({status: "canceled"})
    let withdraws = await Withdraws.find()
    let refdata = await Refdata.findOne({userid: req.user._id})
    if(req.query.page == "history"){
        if(req.query.type == "all"){
            history = await History.find({userid: req.user._id})
        }else {
            if(req.query.type === "deposit"){
                history = await Deposits.find({user: req.user.username})
            }else{
                history = await History.find({userid: req.user._id, type:req.query.type})
            }
        }

    }
    res.render("dashboard",
        {
            page: req.query.page,
            allUsers, 
            userdetails: user, 
            refdata: refdata, 
            history: history, 
            type: req.query.type, 
            depositreq: depositreq, 
            changepassreq: changepassreq, 
            approvedreq: approveddep, 
            canceledwithdraws: canceledwithdraws, 
            msg: "", 
            withdraws: withdraws, 
            withdrawmsg: ""
        }
    )
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
                        deposits: 0,
                        withdraws: 0,
                        activedeposits: 0,
                        currentballance : 0
                    }
                })
        
                saveuser = await saveuser.save()

                //referral related logic

                if(referrer){
                    let referrerdata = await Refdata.findOne({userid: referrer._id})
                     referrerdata.yourrefs.push(saveuser.username)

                    let upline = await Users.findById(referrer._id)
                    upline.account = {...upline.account, currentballance: upline.account.currentballance + 10}

                    let addhistory = new History({
                        userid: referrer._id,
                        type: "commission",
                        amount: 10,
                        currency: ""
                    })

                    upline = await upline.save()
                    referrerdata = await referrerdata.save()
                    addhistory = await addhistory.save()

                    
                    console.log(referrerdata.yourrefs, upline)
                }

                await new Refdata({
                    userid: saveuser._id,
                    referrer: referrer ? referrer.username : "" ,
                    reflink: `https://${req.hostname}/signup?ref=${saveuser.username}`
                }).save()
                console.log(saveuser)
                res.redirect("/login")
                const mailBody = welcomeMail(req.body.username)
                sendMail(req.body.email, "Account Registeration Successfull", mailBody)
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
    req.body.amount = parseInt(req.body.amount)
    console.log(req.body, typeof req.body.amount)
    let deposit = new Deposits({
        user: req.user.username,
        usermail: req.user.email,
        plan: req.body.plan,
        currency: req.body.currency,
        amount: req.body.amount,
        status: "pending"
    })


    deposit = await deposit.save()
    res.redirect("/dashboard")
})

//withdraw post route
app.post("/withdrawfunds", isLoggedIn, async(req, res)=>{
 req.body.withdrawamount = parseInt(req.body.withdrawamount)

 let user = await Users.findOne({username: req.user.username})
 console.log(req.body, user.account)

if(req.body.withdrawamount > user.account.currentballance){
    res.redirect("/dashboard")
}else{

    let withdrawalWallet = req.body.withdrawcurrency === "Bitcoin" 
                            ? 
                            user.bitcoinaddress 
                            : 
                            req.body.withdrawcurrency === "Ethereum"
                            ?
                            user.ethereumaddress
                            :
                            user.trc20address

    
    let withdrawal = new Withdraws({
        user: req.user.username,
        usermail: req.user.email,
        status: "pending",
        amount: req.body.withdrawamount,
        currency: req.body.withdrawcurrency,
        wallet: withdrawalWallet
    })

    let addhistory = new History({
        userid: user.id,
        type: 'withdrawal',
        amount: req.body.withdrawamount,
        currency: req.body.withdrawcurrency
    })

    user.account = {...user.account, withdraws: user.account.withdraws + req.body.withdrawamount, activedeposits: 0, currentballance: user.account.currentballance - req.body.withdrawamount}

    withdrawal = await withdrawal.save()
    addhistory = await addhistory.save()

    res.redirect("/dashboard")
   
}
})

//forgot password post route
app.post("/passwordforgot", async (req, res)=>{
    console.log(req.body)
    if(!req.body){
        res.render('forgotpassword', {message: "Field cannot be empty"})
    }else{
        let user = await Users.findOne({email: req.body.email})
        if(!user){
            res.render('forgotpassword',{message: "This email is not a registered user"})
            return
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash("1234", salt, async function(err, hash) {
                await Users.findOneAndUpdate({email: req.body.email},{password: hash})
                let resetPassMail = resetPasswordMail(user.username)
                sendMail(req.body.email, "Reset Password Successful", resetPassMail)
                console.log("password changed")
            })
        })

        let resetpassword = await new ResetPassword({
            email: req.body.email
        }).save()

        res.render('forgotpassword', {message: 'an email would be sent to you shortly with more details'})

    }

})

//remove password reset from admin dashboard
app.post("/removepassreq/:id", async (req, res)=>{
    let resetpassword = await ResetPassword.findByIdAndDelete(req.params.id)
    res.redirect("/dashboard?page=dar_admin_control_panel")
})

//approving withdraw
app.post("/approvewithdraw/:id", async (req, res)=>{
    let withdraw = await Withdraws.findById(req.params.id)
    let user = await Users.findOne({username: withdraw.user})

    console.log("currenet total withdraws", user.account.withdraws, "withdraw amount: ", withdraw.amount)

    user.account = {
        ...user.account, 
        withdraws: typeof user.account.withdraws === "number" && user.account.withdraws !== NaN ? user.account.withdraws  + withdraw.amount : withdraw.amount, 
        activedeposits: 0, 
        currentballance: typeof user.account.currentballance === "number" ? user.account.currentballance - withdraw.amount : withdraw.amount
    }

    withdraw.status = 'approved'

    user = await user.save()
    await withdraw.save()

    res.redirect("/dashboard?page=dar_admin_control_panel")
    let mailBody = withdrawMail(user.username, withdraw.amount)
    sendMail(user.email, "Withdrawal Approved", mailBody)
    
})

//approving deposit requests
app.post("/approvedeposit/:id", async (req, res)=>{
    console.log(req.body)
    let deposit = await Deposits.findById(req.params.id)
    let user = await Users.findOne({username: deposit.user})

    if(deposit.status === 'approved') return 

    user.account = {
        ...user.account, 
        activedeposits: user.account.deposits + deposit.amount, 
        deposits: user.account.deposits + deposit.amount,
        currentballance: user.account.currentballance + deposit.amount
    }


    deposit.status = 'approved'

    let history = new History({
        userid: user.id,
        type: 'deposit',
        amount: deposit.amount,
        currency: deposit.currency
    })

    user = await user.save()
   await deposit.save()
   await history.save()

    console.log(req.params, deposit, user.account)

    res.redirect("/dashboard?page=dar_admin_control_panel")
    let mailBody = depositMail(user.username, deposit.amount)
    try{ 
        sendMail(user.email, "Deposit Approved", mailBody)
    }catch(e){
        throw new Error(e.message)
    }
})

//canceling withdrawal request
app.post("/cancelwithdrawal/:id", async(req, res)=>{
    let withdrawal = await Withdraws.findById(req.params.id)
    let user = await Users.findOne({username: withdrawal.user})

    withdrawal.status = 'canceled'

    user.account = {...user.account, currentballance: user.account.currentballance + withdrawal.amount, withdraws: user.account.withdraws - withdrawal.amount }

    await withdrawal.save()
    await user.save()

    res.redirect("/dashboard?page=dar_admin_control_panel")
    let mailBody = cancelWithdrawMail(user.username, withdrawal.amount)
    sendMail(user.email, "Withdrawal Canceled", mailBody)
})

//clearing pending ballance
app.post("/clearpending/:id", async(req, res)=>{
    let withdrawal = await Withdraws.findById(req.params.id)
    let user = await Users.findOne({username: withdrawal.user})

    user.account = {...user.account, withdraws: 0}

    await user.save()

    res.redirect("/dashboard?page=dar_admin_control_panel")
})

//adding ballance to user account
app.post("/addballance/:id", async(req, res)=>{
    console.log(req.body)
    let deposit = await Deposits.findById(req.params.id)
    let user = await Users.findOne({username: deposit.user})
    let newballance = parseInt(req.body.newbal)

    user.account = {...user.account, currentballance: user.account.currentballance + newballance}

    user = await user.save()

    console.log(user)
    res.redirect("/dashboard")
})

//searchhistory post route
app.post("/searchtransactions", async(req, res)=>{
    res.redirect(`/dashboard?page=history&type=${req.body.transactiontype}`)
})

//edit profile route
app.post("/editprofile/:id", isLoggedIn, async (req, res)=>{

    let user = await Users.findById(req.params.id)

   if(req.body.newpass){
        if(req.body.newpass !== req.body.retypepass){
            profileupdateError("The two passwords do not match")
            return
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.newpass, salt, async function(err, hash) {
                    user.password = hash
                    user.bitcoinaddress = req.body.btcaddr
                    user.ethereumaddress = req.body.ethaddr
                    user.trc20address = req.body.trcaddr
                 
                    console.log("password changed")
                    edituser()
                })
            })
        }
    }else{
        user.bitcoinaddress = req.body.btcaddr
        user.ethereumaddress = req.body.ethaddr
        user.trc20address = req.body.trcaddr
     
        edituser()
    }
    
   

   function edituser(){
    user.save()
        req.logout((err)=>{
            res.redirect("/login")
        })
   }

    function profileupdateError(msg){
        res.render("dashboard", {page: 'profile', userdetails: user, msg: msg /*refdata: refdata, history: history, type: req.query.type, depositreq: depositreq*/})
    }
})
//support talk to us post route
app.post('/talk', (req, res)=>{
    console.log(req.body)
    res.redirect("/support")
})

//logout
app.post("/logout", (req, res)=>{
    req.logout((err)=>{
        res.redirect("/")
    })
})

app.listen(port, ()=>{console.log(`app listening on port ${port}`)})