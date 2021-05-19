const {Client} =require('pg');
// console.log(process.env.DB_URL);
const client=new Client(process.env.DB_USER
);
module.exports=client