const jwt=require('jsonwebtoken');
const client = require('../config/db');



exports.verifyToken=(req,res,next)=>{
    const token=req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, (err,decoded)=>{
        if(err){
            res.status(500).json({
                error:"Internal server error",
            });
        }
        else{
const email=decoded.email;
client
.query(`SELECT * FROM users where email='${email};`)
.then((data)=>{
    if(data.rows.lenght===0){
        res.status(400).json({
            error:"Invalid Token",
        });
    }
    else{
        next();
    }
}).catch((err)=>{
    res.status(500).json({
        message:"Database problem",
    });
});
        }
   });

}