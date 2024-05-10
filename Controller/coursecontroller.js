const Course = require('../Model/coursemodel')
// const { body, sanitizeBody, validationResult } = require("express-validator");



exports.createCourse =[

 
 // body("coursname").trim().isAlphanumeric().isLength({min:1}).withMessage("course contains letter only"),
 // body("courseprice").isNumeric().withMessage("price contains only number"),

 async (req, res) => {
  // const errors = validationResult(req);
  //       if (!errors.isEmpty()) {
  //           return res.status(400).json({ errors: errors.array() });
  //       }
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

exports.deleteCourse = async (req,res)=>{
      try{
        const deletecourse = await Course.findOneAndDelete({_id:req.params.id})
        if(!deletecourse){
          return res.status(404).json({message:"No user delete"})
        }
          res.status(200).json({message:"user delete successfully"})
      }
      catch(err){
        res.status(500).json({message:"err"})
      }
    }




exports.updateCourse = async (req, res) => {
  try {
    let updatedCourseData = req.body; 
    
    if (req.file) {
      updatedCourseData.image = req.file.filename; 
    }  

    const updatedCourse = await Course.findByIdAndUpdate({_id:req.params.id}, updatedCourseData, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    return res.status(200).json(updatedCourse);
    
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ error: err.message });
  } 
};








