const jwt = require('jsonwebtoken');
const JWT_SIGN = "inzamamisahandsomeguy";

//Middle ware to check the auth token of the user
const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');

    //if there is no token in the header
    if(!token){
        res.status(401).send({error:"Please authenticate a valid token"});
    }
    try {
        //Verifying the token with the sign if it matches or not
        const data = jwt.verify(token,JWT_SIGN);

        //if token get verified with sign then it will get in data.user
        req.user = data.user;

        //After that next function will execute
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate a valid token"});
    }
};

module.exports = fetchuser;