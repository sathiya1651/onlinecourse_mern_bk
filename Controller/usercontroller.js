const User = require('../Model/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const user = new User({ name, username, password });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      'your_secret_key', 
      { expiresIn: '1hr' } 
    );
    
    res.status(201).json({ message: 'User created successfully',token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

  

  exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
          const payload = {
            user: { id: user.id }
          };
  
          jwt.sign(payload, 'secretKey', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
          });
        } else {
          return res.status(401).json({ message: 'Incorrect password' });
        }
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  };
  
      
  

   exports.alluser =async (req,res)=>{
    try{
      const allusers = await User.find();
      res.status(200).json(allusers);
    }
    catch(err){
      res.status(500).json({message:"err"})
    }
   }

 
     








    exports.delete = async (req,res)=>{
      try{
        const deleteuser = await User.findOneAndDelete({userid:req.params.id})
        if(!deleteuser){
          return res.status(404).json({message:"No user delete"})
        }
          res.status(200).json("User Successful dele")
      }
      catch(err){
        res.status(500).json({message:"err"})
      }
    }

exports.deleteall = async(req,res)=>{
    try{
         await User.deleteMany({})
        res.status(200).json({message:"Delete all record"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}