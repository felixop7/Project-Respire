const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const {User}=require('./user.js');

const DeviceSchema=new Schema({
    SerialNumber:{
        type:Number,
        required:true
    },
    ownername:{
        type:String,
        reference:User,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        default:0,
        required:true
    }

})
const Device=mongoose.model("Device",DeviceSchema);
module.exports={Device}