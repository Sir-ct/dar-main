const express = require("express")
const mongoose = require("mongoose")


const app = express()


app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')

mongoose.connect(process.env.PORT || "mongodb://localhost/dar")

const port = process.env.PORT || 3000

//base(index) route
app.get("/", (req, res)=>{
    res.render("index")
})

//about company get route
app.get("/about", (req, res)=>{
    res.render("about")
})

//faq get route
app.get("/faq", (req, res)=>{
    res.render("faq")
})

//terms get route
app.get("/terms", (req, res)=>{
    res.render("terms")
})

//login get route
app.get("/login", (req, res)=>{
    res.render("login")
})

//register get route
app.get("/signup", (req, res)=>{
    res.render("register")
})

//contact us get route
app.get("/support", (req, res)=>{
    res.render("support")
})

//forgot password get route
app.get("/passwordforgot", (req, res)=>{
    res.render("forgotpassword")
})

app.get("/dashboard", (req, res)=>{
    res.render("dashboard")
})

//post routes start here
app.post("/registerdar", (req, res)=>{
    console.log(req.body)
})
//deposit post route
app.post("/depositfunds", (req, res)=>{
    console.log(req.body)
    res.redirect("/dashboard")
})

app.listen(port, ()=>{console.log(`app listening on port ${port}`)})