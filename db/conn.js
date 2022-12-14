const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL, (err)=>{
    if(err){
        console.log("DB ERROR")
    }
})