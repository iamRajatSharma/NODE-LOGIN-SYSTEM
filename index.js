const express = require("express")
const path = require("path")
const app = express()
require("dotenv").config()
require("./db/conn")
const session = require("express-session")

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true
}))

app.set("view engine", "ejs")
app.use("/", require("./routes"))
app.set("views", path.join(__dirname, "/public"))


app.listen(process.env.PORT1, (err) => {
    if (!err) {
        console.log(`Server is running on port ${process.env.PORT1}`)
    }
})