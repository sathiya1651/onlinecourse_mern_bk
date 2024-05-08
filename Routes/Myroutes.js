const express = require('express')

const router = express.Router();

const user = require('../Controller/usercontroller');

const course = require('../Controller/coursecontroller');

router.post('/signup',user.signup);
router.post("/login",user.login);
router.get("/alluser",user.alluser);
router.delete("/delete/:id",user.delete);
router.patch("/update/:id",user.updateUser);



router.post('/course',course.createCourse);
router.get('/allcourse',course.getAllCourse);



module.exports=router;