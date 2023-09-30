const {PolynomialRegression}=require('ml-regression');

const getpredictions= async(req,res)=>{
    // console.log(req.body)
    const{lat,lon}=req.body
    // console.log(lat)
    const componentslist=await opendata(lat,lon);
    const cofficients=await getcofficients(componentslist)
    const predictions=await predict(cofficients)
    // console.log(predictions)
    return res.status(200).json(predictions)
}
const opendata=async(lat,lon)=>{
        const apikey = "22e6cb0904c2e25b94524030ed81bf81"
        // while deconstucting an object the field/key name must be same else undefined
        const{start,end}= await gettime()
        // console.log(start,end)
        var componentslist={
                "co":[],
                "no": [],
                "no2": [],
                "o3": [],
                "so2": [],
                "pm2_5": [],
                "pm10": [],
                "nh3": []
            }
        for(i=start;i<=end;i+=86400){
            j=i+86400
            url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&start=${i}&end=${j}&&appid=${apikey}`
            const response = await fetch(url)
            // response.json reuturns a promise so consol.log(response.json) results pending promise
            const data = await response.json()
            const{coord,list}=data
            const{main,components,dt}=list[0]
            const{co,no,no2,o3,so2,pm2_5,pm10,nh3}=components
            // console.log(components)
            componentslist.co.push(co)
            componentslist.no.push(no)
            componentslist.no2.push(no2)
            componentslist.o3.push(o3)
            componentslist.so2.push(so2)
            componentslist.pm2_5.push(pm2_5)
            componentslist.pm10.push(pm10)
            componentslist.nh3.push(nh3)
        }
        // console.log(componentslist)
        return componentslist
}

const predict=async(cofficients)=>{
    const len = Object.keys(cofficients).length;
    // console.log(len,cofficients)
    const key=["co","no","no2","o3","so2","pm2_5","pm10","nh3"]
    var value=[]
    const prediction={}
    
    for(var keys in cofficients){
        let result=0
        var array =cofficients[keys]
        for(var j=0;j<array.length;j++){
            result+=array[j]*Math.pow(16,j)
        }
        value.push(result)
    }
    for(var i=0;i<value.length;i++){
        prediction[key[i]]=value[i]
    }
    console.log(prediction)
    return prediction
}
const getcofficients=async(componentslist)=>{
    const x = [];
    for (let i = 1; i <= 15; i++) {
    x.push(i);
    }

    const co=componentslist.co
    const no=componentslist.no
    const no2=componentslist.no2
    const o3=componentslist.o3
    const so2=componentslist.so2
    const pm2_5=componentslist.pm2_5
    const pm10=componentslist.pm10
    const nh3=componentslist.nh3

    // create a instance of polynomial regression (x,y,degree)
    console.log(2,x,co)
    const regressionco = new PolynomialRegression(x, co,1);
    const regressionno = new PolynomialRegression(x, no,1);
    const regressionno2 = new PolynomialRegression(x, no2,1);
    const regressiono3 = new PolynomialRegression(x, o3,1);
    const regressionso2 = new PolynomialRegression(x, so2,1);
    const regressionpm2_5 = new PolynomialRegression(x, pm2_5,1);
    const regressionpm10 = new PolynomialRegression(x, pm10,1);
    const regressionnh3 = new PolynomialRegression(x, nh3,1);
    // Fit the data to the polynomial regression model
    const coefficientsco = regressionco.coefficients;
    const coefficientsno = regressionno.coefficients;
    const coefficientsno2 = regressionno2.coefficients;
    const coefficientso3 = regressiono3.coefficients;
    const coefficientsso2 = regressionso2.coefficients;
    const coefficientspm2_5 = regressionpm2_5.coefficients;
    const coefficientspm10 = regressionpm10.coefficients;
    const coefficientsnh3 = regressionnh3.coefficients;

    const coefficients={
        coefficientsco,
        coefficientsno,
        coefficientsno2,
        coefficientso3,
        coefficientsso2,
        coefficientspm2_5,
        coefficientspm10,
        coefficientsnh3}

    // console.log(coefficients)
    return coefficients
}

const gettime=async()=>{
// Get the current date and time
const currentDate = new Date();

// Calculate the end Unix timestamp (current time)
var end = Math.floor(currentDate.getTime() / 1000);
end=end-(7*24*60*60)
// Calculate the start Unix timestamp (14 days ago)
const start = end - (14 * 24 * 60 * 60);
console.log(start,end)
// returning multiple outputs in js must be of json/object format
const result={start, end}
return result
}



const getdata=async(lat,lon)=>{
    apikey="AIzaSyASuehXhkh3smGAN-pVfg_iStSMfCDJv5k"
    const features='breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information'
    const url=`https://api.breezometer.com/air-quality/v2/current-conditions?lat=${lat}&lon=${lon}&key=${apikey}&features=${features}`
    const response=await fetch(url)
    data= await response.json()
    // console.log(data)
    return data

}

const pollutiondatas= async(req,res)=>{
    apikey="6df209f26d14153595694c985ea00a66b824bbb0"
    try {
        const{lat,lon}=req.body
        const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=6df209f26d14153595694c985ea00a66b824bbb0`;
        const response = await fetch(url);
        const data= await response.json()
        // console.log(data)
        return res.status(200).json(data)
    }
    catch(error){
        // console.log(`Error:${error}`)
    }
}


module.exports = {getpredictions}