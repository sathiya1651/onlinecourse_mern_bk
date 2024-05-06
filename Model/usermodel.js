const mongoose = require('mongoose');
const mongooseAutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');



const Userschema = new mongoose.Schema({
    userid: { type: Number, unique: true },
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { timestamps: true });



Userschema.plugin(mongooseAutoIncrement, { inc_field: 'userid' });


Userschema.pre("save", async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password=hashedPassword
        next()

    }catch(error){
        next(error)
    }
})

const User = mongoose.model('User', Userschema);

module.exports = User;