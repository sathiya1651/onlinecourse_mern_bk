const Course = require('../Model/coursemodel')
const { body, sanitizeBody, validationResult } = require("express-validator");
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


exports.createCourse =[

 upload.single('image'),
 
 body("coursname").trim().isAlphanumeric().isLength({min:1}).withMessage("course contains letter only"),
 body("courseprice").isNumeric().withMessage("price contains only number"),

 async (req, res) => {
  const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  try {
    const {coursename,coursedescription,courseprice  } = req.body;
    const image = req.file.path; 
    const course = await Course.create({ coursename,coursedescription, courseprice, image });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
];

exports.getAllCourse = async (req, res) => {
  try {
    const allcourse = await Course.find();
    res.json(allcourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.updateCourse = async (req, res) => {
  try {
    const { coursename, coursedescription, courseprice } = req.body;

    let updateFields = { coursename, coursedescription, courseprice };

    if (req.file) {
      updateFields.image = req.file.filename;
    }

    const updatedCourse = await Course.findByIdAndUpdate({courseid:req.params.id},updateFields, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    return res.status(200).json(updatedCourse);
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ error: err.message });
  } 
};









