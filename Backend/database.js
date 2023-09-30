require('dotenv').config()
const mongoose=require("mongoose");
const {MongoClient,ServerApiVersion} = require('mongodb');


const url="mongodb+srv://abiral:abiral@cluster0.infj9ve.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(url, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
const dbconnect=async ()=>{
    try{
        // callback function.then((oncomplete)=>{},(onfailure)=>{})
        mongoose.connect(url).then(()=>{
            console.log("DataBaseConnection :Successful")
            })
    }
    catch(error){
        console.log(`DB Connection failure due to:${error}`)

    }
}
module.exports = {
    dbconnect
}

