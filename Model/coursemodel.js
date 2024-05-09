const mongoose = require('mongoose');
const mongooseAutoIncrement = require('mongoose-sequence')(mongoose);

const Courseschema = new mongoose.Schema({
    _id: { type:Number, unique:true},
    coursename: { type:String, required:true},
    coursedescription : {type:String, required:true},
    courseprice:{type:Number, required:true},
    image :{type:String, required:true},

}, { timestamps: true })

Courseschema.plugin(mongooseAutoIncrement, { inc_field: '_id' });

const Course = mongoose.model('Course',Courseschema)

module.exports=Course;