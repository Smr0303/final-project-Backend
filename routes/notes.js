const express=require('express');
const notes=express();

const {addNote, CreateNote, UpdateNote} = require('../controllers/notes');
