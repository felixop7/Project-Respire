const express =require('express')
const{ReqAuth}=require('../middleware/auth.js')
const{Login,SignUp}=require("../controllers/user.js")
const{pollutiondata}=require("../controllers/pollution.js")
const{getpredictions}=require("../controllers/predict.js")
const{adddevice}=require("../controllers/device.js")
const{getpayment,seebalance}=require("../controllers/transaction.js")
const router=express.Router();

router.post('/signup',SignUp);
router.post('/login',Login);
router.post('/pollution',pollutiondata)
router.use(ReqAuth)
router.post('/predict',getpredictions)
router.post('/adddevice',adddevice)
router.post('/getpayment',getpayment)
router.post('/seebalance',seebalance)
module.exports =router