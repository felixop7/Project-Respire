const {User}=require("../models/user.js");
const axios = require("axios");
const {getusername} = require("../middleware/auth.js")
const{Device} = require("../models/device.js");

const adddevice=async (req, res) =>{
    const{SerialNumber,location}=req.body
    const username=getusername(req,res)
    try{
        if(!SerialNumber || !location){throw new Error("All fields are compulsory")}
        const deviceexists=await Device.findOne({SerialNumber})
        if(deviceexists){throw Error(`Error!! Device with SerialNumber:${SerialNumber} already exists`)}
        const createdevice=await Device.create({SerialNumber,ownername:username,location,points:0})
        return res.status(200).json({message:`Device with serial number ${SerialNumber} set up at ${location}`})
    }
    catch(error){
        console.log(`Error:${error}`)
    }
}

module.exports ={adddevice}