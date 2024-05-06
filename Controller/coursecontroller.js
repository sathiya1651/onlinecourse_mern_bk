const Course = require('../Model/coursemodel')



exports.createCourse = async (req, res) => {
  try {
    const {coursename,coursedescription,courseprice  } = req.body;
    const image = req.file.path; 
    const course = await Course.create({ coursename,coursedescription, courseprice, image });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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









