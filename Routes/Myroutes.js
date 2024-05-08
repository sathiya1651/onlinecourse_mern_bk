const express = require('express')

const router = express.Router();

const user1 = require('../Controller/usercontroller');

const course1 = require('../Controller/coursecontroller');

router.post('/signup',user1.signup);
router.post("/login",user1.login);
router.get("/alluser",user1.alluser);

router.delete("/delete/:id",user1.delete);




router.post('/course',course1.createCourse);
router.get('/allcourse',course1.getAllCourse);



module.exports=router;