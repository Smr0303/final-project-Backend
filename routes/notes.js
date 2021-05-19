const express=require('express');
const {verifyToken}=require('../middleware/authmiddleware');
const router=express.Router();

router.post('/add', verifyToken ,(req,res)=>{
res.send("Mst chala");
});
const notes=express();
module.exports=router;

// const {addNote, CreateNote, UpdateNote} = require('../controllers/notes');
