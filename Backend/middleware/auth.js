const jwt= require('jsonwebtoken');

// next call next handlers after this funcion is executed
const ReqAuth=async (req,res,next)=>{
    const{authorization}=req.headers;
    const token =authorization.split(' ')[1];
    //Verifying the Authentication
    if(!authorization){
        return res.status(400).json({error: 'Authorization Token not provided'});
    }

    try{
        const user=jwt.verify(token,process.env.SECRET)
        req.user=user
        next()
    }
    catch(error){
        res.status(401).json({error:"Invalid Token"})
    }
}

const Auth0=async(req, res) => {
    const idToken = req.body.idToken; // Get the ID token from the request
    // Verify the ID token
    const decodedToken = verifyIdToken(idToken);

    if (!decodedToken) {
      // Token verification failed
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  
    // Token verification succeeded
    // You can access user claims in 'decodedToken' to perform authorization checks
    try{
        const user = decodedToken.sub; // 'sub' is the user identifier
        req.user=user
        next()
    }
    catch(error){
        res.status(401).json({error:"Invalid Token"})
    }
  }

const getusername=(req, res)=>{
    const {authorization} = req.headers
    const token =authorization.split(' ')[1];
    const{username}=jwt.verify(token,process.env.SECRET);
    return username;
}


module.exports = {ReqAuth,getusername};