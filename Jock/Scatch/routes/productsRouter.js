const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig.js')
const productModel = require('../models/productModel.js')

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash('success',"product create successfully");
    res.redirect('/owners/admin');
  } catch (error) {
    res.send(error.message);
  }
})
module.exports = router;

