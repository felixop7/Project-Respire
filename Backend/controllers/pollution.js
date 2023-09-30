const {User}=require("../models/user.js");
const{Device}=require("../models/device.js");
const axios = require("axios");
const {getusername} = require("../middleware/auth.js")
const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction,ContractCreateTransaction,ContractId,FileCreateTransaction,ContractFunctionParameters } = require("@hashgraph/sdk");
require('dotenv').config()
const fs = require('fs');

// var bytecodeFileId
// let newContractId  
const pollutiondata=async(req,res)=>{
  const{lat,lon}=req.body
  // const username=getusername(req,res)
  try{
  const response=await opendata(lat,lon)
  const{coord,list}=response
  const{lats,longs}=coord
  const{main,components,dt}=list[0]
  const{aqi}=main
  const{co,no,no2,o3,pm2_5,pm10,nh3}=components
  const{time}=dt
  // const message=await getmessage(aqi,username)
  console.log(aqi)
  index=await scale(aqi)
  let output={
    coord,components,aqi,dt
  }
  return res.status(200).json(output)
  }
  catch(error){
      console.log(`Error:${error}`)}
}

const getmessage=async(aqi,username)=>{
  const getuser= await User.findOne({"username":username})
  if(!getuser){throw Error("User not found")}
  const age=getuser.age
  const conditionslist=getuser.medicalconditions
  const medical=["Bronchitis","Asthma","Pregnancy"]
  const condition=conditionslist.join("and")
  const fullname=getuser.fullname
  let message="",message0="",message1=""
  switch (aqi) {
      case 1:
        message= 
        `
        Air quality is Good.
        So,It's ok to go the location you have chosen.
        It's an excellent time to go outside and enjoy outdoor activities.
        You can open windows and let in fresh air at home.
        It's perfect to engage in outdoor exercises and sports without significant concerns.
        Take this opportunity to spend time outdoors in nature and
        take a day out with the mask off`;

        break;
      case 2:
          message= 
          `Air quality is Fair. 
          So,It's alright to go the chosen location and you can also
          continue with your usual daily activities.
          You can keep windows and doors open to allow fresh air indoors.
          Even though it's ok to maintain outdoor exercise routines, but it's better if you
          pay attention to any changes in air quality alerts.
          Be mindful of any symptoms like coughing, sneezing, or watery eyes.
          Keeping on the mask will be handy.`;
      case 3:
        message = `Air quality is Moderate.
        So,It's ok for you to go to the chosen location with your mask on.
        You can go about you day as usual but don't forget to wear a mask.
        Outdoor activities are generally safe, but sensitive groups should take precautions.
        Stay informed about air quality updates, especially if you start to have respiratory problems.
        Keep windows and doors open for ventilation but remain alert to any changes in air quality.`;
        break;
      case 4:
        message= 
        `Air quality is Poor.
        So,It's suggested you don't go to the location searched if not necessary and without a mask.
        It is also advised to reduce strenuous outdoor activities like running or biking.
        If possible, work from indoors or reduce outdoor exposure.
        Close windows and doors to prevent outdoor air from entering your home.
        Also don't go outside without your mask
        Consider using air purifiers if you have them.`;
        break;
      case 5:
        message= `Air quality is Very Poor.
        So, don't go to the chosen location until absolutely necessary .If you need to go use 
        a mask with air purifing valves and filters.
        It is suggested to avoid outdoor activities, especially strenuous ones like exercise.
        If you must go outside, wear a mask designed to filter out pollutants.
        Keep windows and doors closed to minimize indoor exposure.
        Consider postponing non-essential outdoor activities until air quality improves"
        Also it is advised to regularly visit your doctor to monitor your health condition`
        break;
      default:
        message = "Unknown";
    }
    if(condition && aqi==1 ){
      message0=`Even at you medical conditions "${condition}" it is ok to go outside to the selected location.But take immedaite action incase of any discomfort and allergies.`
    }
    else if(condition && aqi>1 && aqi<=3){message0=
      `At your given medical conditions of "${condition}" you need to make sure to wear a mask and carry your prescribed medication while traveling to the 
      searched  location.If you find the air condition unpleasent upon your visit immediately head indoors.Please visit the doctor promtly incase of any discomfort and allergies
      .It is necessary for you to take care of yourself under these air conditions and your medical conditions.\n`
    }else if(condition && aqi>3){
      message0=`Give your medical condition of "${condition}" consider air at place you are visiting to be radioactive.There just one thing for you to do
      sit indoors with your air purifiers at highest settings.\n`
    }
    else if(!condition){
      console.log(2)
      message0=`Even though you don't have any medical condition. Please see the instructions provided below for your wellbeing\n`
    }
    if(aqi>=4){message1=
      `Danger Alert! It's harmful for you to be outside regardless of your age group.If you suffer from any respiratory diease please be more careful and responsible to
      take necessary action to minimize your outdoor activities.\n`}
    else if(age<10 && aqi<3){message1=
      `For Children of age ${age} it's a green signal to play under good and fair air conditions unless you suffer from respiratory diease.\n`
    }else if(age>40 && age<60 && aqi<3){message1=
      `At your age of ${age} it's alright for you to be outside under fair air conditions but you must take necessary precautions in regard to your health\n`
    }else if(age>=60 && aqi<3){message1=`Considering the risk at your age of ${age} it's advised to you to be outside only if necessary and during early morining when pollution is low\n`}
    else{
      message1=`For your age of ${age} it's okay to be outside under fair and good conditions but you must avoid longer exposure otherwise\n`
    }
  const results= `Dear ${fullname} `+message0+message1+message
  return results
}
const opendata=async(lat, lon)=>{
  const SerialNumber="11223344"
  const apikey = "22e6cb0904c2e25b94524030ed81bf81"
  url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`
  const response = await fetch(url)
  const updatecount=await Device.findOneAndUpdate({SerialNumber: SerialNumber},{$inc:{points:1}})
  const usercheck=await Device.findOne({SerialNumber: SerialNumber})
  const accountid=await usercheck.accountid
  // response.json reuturns a promise so consol.log(response.json) results pending promise
  const data = await response.json()
  return data 
}

const hederadata=async(lat, lon)=>{
// console.log(0,myAccountId)
  const SerialNumber="123456"
  const apikey = "22e6cb0904c2e25b94524030ed81bf81"
  url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`
  const response = await fetch(url)
  const updatecount=await Device.findOneAndUpdate({SerialNumber: SerialNumber},{$inc:{points:1}})
  const usercheck=await Device.findOne({SerialNumber: SerialNumber})
  const accountid=await usercheck.accountid
  await increasePoints(accountid,10)
  // response.json reuturns a promise so consol.log(response.json) results pending promise
  const data = await response.json()
  return data 
}
const scale=(aqi)=>{
  // Scale the ratio to the output range with the specified gap
  const scaledValue = 10 + (aqi - 1) * 20;
  return scaledValue
}
    
// // Define the path to your .bin file
// const createfile=async()=>{
// try{
//     const contractBytecode = fs.readFileSync("./contractbyte.bin");
//     // console.log(fs.readFileSync("./contractbyte.bin").byteLength);
//     //Create a file on Hedera and store the hex-encoded bytecode
//     const fileCreateTx = new FileCreateTransaction()
//     // console.log(1.1)
//     // Create a FileCreateTransaction and set its contents
//     fileCreateTx.setContents(contractBytecode);
//     // console.log(2.2)
//     // Freeze the transaction and execute it as needed
//     fileCreateTx.freezeWith(client)
//     // console.log(3.3)
//     const transactionReceipt = await fileCreateTx.execute(client);
//     // console.log(transactionReceipt)
//     // console.log(1);
//     // Get the receipt of the file create transaction
//     const fileReceipt = await transactionReceipt.getReceipt(client);
//     // console.log(2);
//     // Get the file ID from the receipt
//     const bytecodeFileId = fileReceipt.fileId;
//     // console.log(3);
//     // Return bytecodeFileId or perform additional actions
//     return bytecodeFileId
  
// }
// catch (Error){console.log(1,Error)}
// }




// const gas=100000 
// const contractinstance=async (bytecodeFileId) =>{
//     // console.log(bytecodeFileId);
//     // Instantiate the contract instance
//     const contractTx = new ContractCreateTransaction()
//     //Set the file ID of the Hedera file storing the bytecode
//     .setBytecodeFileId(bytecodeFileId)
//     //Set the gas to instantiate the contract
//     .setGas(gas)
//     //Provide the constructor parameters for the contract
//     .setConstructorParameters(new ContractFunctionParameters().addString("Hello from Hedera!"));
    
//     console.log(2)
//     //Submit the transaction to the Hedera test network
//     const contractResponse = await contractTx.execute(client);
    
//     //Get the receipt of the file create transaction
//     const contractReceipt = await contractResponse.getReceipt(client);
    
//     //Get the smart contract ID
//     const newContractId = contractReceipt.contractId;
//     const ContractAdress=newContractId.toSolidityAddress();
//     return newContractId
//     }
// (async function (){
//     bytecodeFileId=await createfile()
//     console.log("The smart contract byte code file ID is " + bytecodeFileId+typeof(bytecodeFileId));
//     newContractId = await contractinstance(bytecodeFileId);
//     console.log("The newContractId " + newContractId)
//     // console.log(0,newContractId,myAccountId)
// })()


// const increasePoints=async(accountId, contractId, amount)=>{
//  try {
//       const contract = ContractId.fromString(contractId);
    
//          // Call the contract function to increase points
//          const txResponse = await new ContractCallQuery()
//                 .setContractId(contract)
//                 .setGas(100000) // Adjust the gas as needed
//                 .setFunction("increasePoints") // Replace with the actual function name
//                 .addString(accountId) // Pass the user's account ID as an argument
//                 .execute(client);
    
//             // Wait for the transaction to complete
//           await txResponse.getReceipt(client);
//           console.log(`Points increased for account ${accountId} by ${amount}.`);
//         } catch (error) {
//             console.error("Error increasing points:", error);
//         } 
// }


module.exports={
    pollutiondata
}