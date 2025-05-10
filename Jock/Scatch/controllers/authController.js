const bcrypt = require('bcrypt');
const userModel = require('../models/userModel.js')
const { generateToken } = require('../utils/generateToken.js')

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({ email: email })
    if (user) return res.status(401).send("user already exist");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return err.message;
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });
          let token = generateToken(user);
          res.cookie('token', token);
          res.redirect('/shop');
        }
      });
    });


  } catch (error) {
    res.send("err.message");
  }

}

module.exports.loginUser = async (req, res) => {
  let {email,password}=req.body;
  let user=await userModel.findOne({email:email})
  if(!user) return res.send("email or password is incorrect");
  bcrypt.compare(password,user.password,(err,result)=>
  {
    if(result){
      let token=generateToken(user);
      res.cookie("token",token);
      res.redirect('/shop');
    }else{
      return res.send("email or password is incorrect");
    }
  })

}

module.exports.logOut=async(req,res)=>
{
  res.cookie('token',"");
  res.redirect('/');
}