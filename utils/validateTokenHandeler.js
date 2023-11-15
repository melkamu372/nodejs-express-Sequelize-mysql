const catchasyncHandler = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt =require('jsonwebtoken');
const validateToken= catchasyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader&& authHeader.startsWith("Bearer")){
        token= authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERET,(err,decode)=>{
            if(err){
            throw new AppError(`The User is not authorized.`, 401);
            }
            req.user=decode.user;
            console.log(decode.user);
            next();
        });
        if(!token){
            throw new AppError(`The user is either un authorized or token is expired.`, 401);
        }
    }
})

 module.exports = validateToken;