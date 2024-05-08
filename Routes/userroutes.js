const express = require('express')

const router = express.Router();

const controller = require('../Controller/usercontroller');



router.post('/signup',controller.signup);
router.post("/login",controller.login);
router.get("/alluser",controller.alluser);

router.delete("/delete/:id",controller.delete);


module.exports=router;