const express = require('express')

const router = express.Router();

const user = require('../Controller/usercontroller');

const course = require('../Controller/coursecontroller');

const path = require('path')
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+ path.extname(file.originalname))
    }
  });
  const upload = multer({ storage: storage });



router.post('/signup',user.signup);
router.post("/login",user.login);
router.get("/alluser",user.alluser);
router.delete("/delete/:id",user.delete);
router.patch("/update/:id",user.updateUser);



router.post('/course',upload.single('image'),course.createCourse);
router.get('/allcourse',course.getAllCourse);
router.patch('/updatecourse/:id',upload.single('image'),course.updateCourse);
router.delete('/deletecourse/:id',course.deleteCourse);



module.exports=router;