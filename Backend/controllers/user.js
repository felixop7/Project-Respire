const {User}=require("../models/user.js");
const bcrypt= require("bcrypt")
const validator=require("validator")
const jwt =require("jsonwebtoken")
const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction,ContractCreateTransaction,ContractId } = require("@hashgraph/sdk");
require('dotenv').config()
const fs = require('fs');

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;
//Create your Hedera Testnet client
const client = Client.forTestnet();
//Set your account as the client's operator
client.setOperator(myAccountId, myPrivateKey);
//Set the default maximum transaction fee (in Hbar)
client.setDefaultMaxTransactionFee(new Hbar(100));
//Set the maximum payment for queries (in Hbar)
client.setMaxQueryPayment(new Hbar(50));

const SignUp= async(req,res)=>{
    console.log(req.body);
    const{username,password,fullname,gender,phonenumber,age,medicalconditions}=req.body
    try{
        //Checking if fields are empty
        if(!username || !password || !fullname  || !phonenumber || !age || !medicalconditions){
            throw Error("All fields must be filled");
        }

        //checking if password and email are same
        if (validator.equals(username,password)){
            console.log(3)
            throw Error("Password and email shouldn't be same");
        }
        
        //checking if password is strong
        if(!validator.isStrongPassword(password)){
            console.log(4)
            throw Error("Please enter a strong  password with minimum length 8 ,1 UpperCase 1,LowerCase,1 Number and 1 Special Character")
        }

        if("Pregnancy" in medicalconditions){
            if(age<10){throw Error(`Pregnancy at age of ${age} is unlikely`)}
            else if(age>60){throw Error(`Pregnancy at age of ${age} is unlikely`)}
            else if(gender !="Female"){throw Error(`Pregnancy being a ${gender} is unlikely`)}
        }
        
        //Checking if email already exists
        const UserExists= await User.findOne({username:username})
        if(UserExists){
          console.log(5)
          throw Error('Error!! Username already exists')
        }

        const salt = await bcrypt.genSalt(10);//generating salt
        const hash= await bcrypt.hash(password,salt);//genreating hash
        const token= jwt.sign({username},process.env.SECRET,{expiresIn:'10d'});
        
        console.log(5.5)
        //Create new keys
        const newAccountPrivateKey = PrivateKey.generateED25519(); 
        const newAccountPublicKey = newAccountPrivateKey.publicKey;
        //Create a new account with 1,000 tinybar starting balance
        const newAccount = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(0))
        .execute(client);
        // Get the new account ID
        const getReceipt = await newAccount.getReceipt(client);
        const newAccountId = getReceipt.accountId;
        console.log(5.6)
        const createuser= await User.create({username,password:hash,fullname,gender,phonenumber,age,medicalconditions,rewards:0,accountid:newAccountId})//creating new user
        console.log(6)
        res.status(200).json({createuser,token});
    }
    catch(error){
        console.log(7)
        res.status(404).json({error:error.message})
    }
}

const Login = async (req, res) =>{
    const {username,password} = req.body;
    try{
        // console.log({email,password})
        //Checking if fields are empty
        if(!username || !password){
            throw Error("All fields must be filled");
        }
        //finging user obj with given email
        const loginuser= await User.findOne({username});
        if(!loginuser){
            throw Error("Incorrect username")
        }
        const check= await bcrypt.compare(password, loginuser.password);
        if(!loginuser || !check){
            throw Error("Invalid Login credentials");
        }
        const token= jwt.sign({username},process.env.SECRET,{expiresIn:'10d'});
        const output={username,token}
        console.log({output})
        res.status(200).json(output);
    }catch(error){
        console.log(error);
        res.status(404).json({error:error.message})
}
}

module.exports={
    SignUp,
    Login
}

