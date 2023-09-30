const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const UserSchema =new Schema({
    username:{
        type:"string",
        required: true,
        unique: true,
        length:50
    },
    password:{
        type:"string",
        required: true,
    },
    fullname:{
        type:String,
        required: true,
        length:50
    },
    gender:{
        type:"String",
        enum: ["Male", "Female","Non-Binary"],
        required:true
    },
    phonenumber: {
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    medicalconditions:[{type:String,required:true}],
    
    rewards:{
        type:Number,
    },
    accountid:{
        type:String,
        required:true
    }
})

const User=mongoose.model("User",UserSchema);
module.exports = {
    User
}