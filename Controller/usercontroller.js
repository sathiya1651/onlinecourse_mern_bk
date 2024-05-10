const User = require('../Model/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, sanitizeBody, validationResult } = require("express-validator")




exports.signup =[
    body("name").trim().isAlphanumeric().withMessage("Name only use letters"),
    body("username").trim().isAlphanumeric().isLength({min:5}).withMessage("username use only 5 letters"),
    body("password").isLength({ min: 4 }).isNumeric().withMessage("password only use min four number only "),

 async (req, res) => {
const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }


  try {
    const { name, username, password } = req.body;

     const existinguser = await User.findOne({ username });
            if (existinguser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
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
}
];

  

  exports.login = [

     body("username").trim().isAlphanumeric().isLength({min:5}).withMessage("username use only 5 letters"),
    body("password").isLength({ min: 4 }).isNumeric().withMessage("password only use min four number only "),

        async (req, res) => {
          const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
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
            res.status(200).json({message:"Login Successful", token });
          });
        } else {
          return res.status(401).json({ message: 'Incorrect password' });
        }
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  }];
  
      
  

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
          res.status(200).json({message:"user delete successfully"})
      }
      catch(err){
        res.status(500).json({message:"err"})
      }
    }

//     exports.updateUser = [

    
//     async(req,res)=>{
//     try{
//         const updateuser = await User.findOneAndUpdate({userid:req.params.id},req.body,{new:true});
//         if(!updateuser){
//             return res.status(404).json({message:"No user available"})
//         }
//         if(password){
//           const  hashedPassword = await bcrypt.hash(password,10);
//           user.password=hashedPassword;
//         }

        
//         res.status(200).json({message:"successfully updated"})
//     }catch(err){
//         res.status(500).json({message:err.message})
//     }
// }
// ]

    exports.updateUser = [
    async (req, res) => {
        try {
            const { password } = req.body; 
            const updateuser = await User.findOneAndUpdate({ userid: req.params.id }, req.body, { new: true });
            if (!updateuser) {
                return res.status(404).json({ message: "No user available" });
            }
            if (password) { 
                const hashedPassword = await bcrypt.hash(password, 10);
                updateuser.password = hashedPassword; 
            }
            await updateuser.save(); 
            res.status(200).json({ message: "Successfully updated" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
];
