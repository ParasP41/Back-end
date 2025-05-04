const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownerModel.js')
require('dotenv').config();
router.get('/', (req, res) => {
  res.send('Hello World!')
})


if (process.env.NODE_ENV === "developement") {
  router.post('/create', async (req, res) => {
    let owner = await ownerModel.find()
    if (owner.length > 0) {
     return res.status(502).send("you dont have permission to create a new owner")
    }

    let {fullname,email,password}=req.body;

    let createdOwner=await ownerModel.create({
      fullname,
    email,
    password,
    })
    res.send(createdOwner);
  })
}

router.get('/admin',function(req,res){
  let success=req.flash("success")
  res.render('createproducts',{success})
})

module.exports = router;

