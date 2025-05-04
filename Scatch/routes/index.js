const express =require ('express');
const router=express.Router();
const isLoggedIn=require('../middleware/isLoggedIn.js');
const productModel = require('../models/productModel.js');
const userModel = require('../models/userModel.js');


router.get('/', (req, res) => {
  let error=req.flash('error');
  res.render('index',{error,loggedin:false});
})

router.get('/shop',isLoggedIn, async function(req,res){
  let product =await productModel.find();
  res.render('shop',{products:product});
})

router.get('/addtocard/:id',isLoggedIn,async (req,res)=>
{
  let user=await userModel.findOne({email:req.user.email});
  
})

router.get('/logout',isLoggedIn,(req,res)=>
{
  res.render('shop');
});



module.exports=router;

