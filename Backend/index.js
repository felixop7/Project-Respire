console.log("Hello World!")
const https=require('https')
const app=require('./app')

const routes=require('./routes/routes.js')
app.use('/api',routes)
app.get('/',(req,res)=>{console.log("Hello World");res.status(200).json({"message":"Hello World"})})


// need o update