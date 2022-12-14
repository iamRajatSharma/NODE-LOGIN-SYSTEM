const express = require("express")
const route = express.Router()
const User = require("./db/Users")
const bodyParser = require("body-parser")
const session = require("express-session")


route.use(bodyParser.urlencoded({ extended: false }))
route.use(bodyParser.json())

route.get("/", (req, res) => {
    if (req.session.email) {
        res.redirect("dashboard")
    }
    else {
        res.render("index")
    }
})

route.post("/auth", async (req, res) => {
    if (req.body.email == '' || req.body.password == '') {

    }
    else {
        let check = await User.find({ email: req.body.email, password: req.body.password }).count()
        req.session.email = req.body.email
        res.redirect("/dashboard")
    }
})

route.get("/dashboard", (req, res) => {
    if (req.session.email) {
        res.render("dashboard", { data: req.session.email })
    }
    else {
        res.redirect("/")
    }

})

route.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

module.exports = route