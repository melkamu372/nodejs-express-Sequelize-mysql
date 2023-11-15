const axios = require('axios');
const AppError = require("../utils/appError");
const catchasyncHandler = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');
// get  user login
const loginUser = catchasyncHandler(async (req,res)=>{
  const {username, password} = req.body;
  if (!username | !password) {
    throw new AppError(`All Fields are mandatory.`, 400);
  }
  const response = await axios.post(process.env.LOGIN_API, {
    username,
    password,
  });

   if(response.data.message=="SUCCESS"){
       const accessToken=jwt.sign({
        user:response.data    
}, 
  process.env.ACCESS_TOKEN_SECERET,
  {expiresIn:"1m"}
  );
  res.status(200).json({accessToken});
}
else{
  throw new AppError(`The user have no access please check Your user name and password .`, 401);
}
});


module.exports={loginUser}