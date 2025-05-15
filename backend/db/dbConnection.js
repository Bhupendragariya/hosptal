import mongoose from "mongoose";


export const dbConnection = () =>{
    mongoose.connect(process.env.MONGODB_URI).then(() =>{
        console.log("connected to database!")
    }).catch((err)=>{
        console.log(`somthinge is worn to db connection : ${err}`)
    })
}