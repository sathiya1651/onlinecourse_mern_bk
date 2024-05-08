const express = require('express')
const router = express.Router();


const coursecontroller = require('../Controller/coursecontroller')






router.post('/course',coursecontroller.createCourse);
router.get('/allcourse',coursecontroller.getAllCourse);


module.exports=router;