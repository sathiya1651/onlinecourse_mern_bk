const express = require('express')
const router = express.Router();


const coursecontroller = require('../Controller/coursecontroller')
const path = require('path')
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+ path.extname(file.originalname))
    }
  });
  const upload = multer({ storage: storage });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };




router.post('/course',upload.single('image'),coursecontroller.createCourse);
router.get('/allcourse',coursecontroller.getAllCourse);
// router.patch('/updatecourse/:id',coursecontroller.updateCourse)


module.exports=router;