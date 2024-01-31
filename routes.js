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

route.post("/login", async (req, res) => {

    if (req.body.email == '' || req.body.password == '') {
        return res.render("index", { "error": "All Fields Requireds" })
    }

    let check = await User.findOne({ email: req.body.email })
    if (check) {
        if (check.password == req.body.password) {
            req.session.email = req.body.email
            return res.redirect("/dashboard")
        }
        else {
            return res.render("index", { "error": "Email or password not matched" })
        }
    }
    else {
        return res.render("index", { "error": "Email not found" })
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

route.get("/register", (req, res) => {
    res.render("register")
})

route.post("/register", async (req, res) => {

    if (req.body.name == '' || req.body.email == '' || req.body.mobile == '' || req.body.password == '') {
        return res.render("register", { "error": "All Fields Requireds" })
    }

    let check = await User.findOne({ email: req.body.email })

    if (check === null) {
        const userData = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            mobile: req.body.mobile
        }
        let result = new User(userData)
        result = await result.save()
        if (result) {
            return res.render("register", { "error": "User Saved Successfully" })
        }
        else {
            return res.render("register", { "error": "Something Error" })
        }
    }
    else {
        return res.render("register", { "error": "Email/mobile is Already Exists" })
    }

})

route.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

module.exports = route