const mongoose = require("mongoose")

mongoose.set('strictQuery', true);

mongoose.connect(process.env.DB_URL, (err)=>{
    if(err){
        console.log("DB ERROR")
    }
})
