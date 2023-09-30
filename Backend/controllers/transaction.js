const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");
const{User}=require("../models/user.js")
const{Device}=require("../models/device.js")
const{getusername}=require("../middleware/auth.js")
require('dotenv').config()

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;
//Create your Hedera Testnet client
const client = Client.forTestnet();
//Set your account as the client's operator
client.setOperator(myAccountId, myPrivateKey);
//Set the default maximum transaction fee (in Hbar)
client.setDefaultMaxTransactionFee(new Hbar(1000));
//Set the maximum payment for queries (in Hbar)
client.setMaxQueryPayment(new Hbar(10));


const getpayment=async(req,res)=>{
    const receiver=getusername(req,res)
    console.log(receiver)
    try{
        const receivercheck= await User.findOne({username:receiver})
        if(!receivercheck){throw new Error("Don't have account for transaction")}
        const devicecheck=await User.find({owenername:receiver})
        if(!devicecheck){throw new Error("There is no device registered by you")}  
        const receiveraccountid=receivercheck.accountid;
        console.log(receivercheck.accountid)
        const devicedata=await Device.aggregate([
                        {$match: { ownername:receiver}},
                        { $group: {
                            _id: null,
                            total: {$sum: "$points"}}
                        }]);
        
        const totalpoints=devicedata[0].total
        console.log(totalpoints)
        const amount=totalpoints*1000
        // Create the transfer transaction
        const sendHbar = await new TransferTransaction()
        .addHbarTransfer(myAccountId, Hbar.fromTinybars(-amount))
        .addHbarTransfer(receiveraccountid, Hbar.fromTinybars(amount))
        .execute(client);

        // Verify the transaction reached consensus
        const transactionReceipt = await sendHbar.getReceipt(client);
        const output=
        `The transfer transaction from my account to the new account was: ${transactionReceipt.status.toString()}
        ${amount} TinyBars transferred to account:${receiveraccountid}`
        const reset=await Device.updateMany(
                { ownername:receiver },
            { $set: { points: 0 } }
          );
        res.status(200).json(output)
    }
    catch(error){console.log(error)}
}

const seebalance=async (req,res)=>{
    const receiver=getusername(req,res)
    try{
        const receivercheck= await User.findOne({username:receiver})
        if(!receivercheck){throw new Error("Don't have account for transaction")}
        const receiveraccountid=receivercheck.accountid;
        // Verify the account balance
        const accountBalance = await new AccountBalanceQuery()
        .setAccountId(receiveraccountid)
        .execute(client);
        const output=`User ${receiver} has balance ${accountBalance.hbars.toTinybars()} tinybars`
        return res.status(200).json(output)
    }
    catch(error){console.log(error)}
}

module.exports={
    getpayment,
    seebalance
}