const express = require('express');
const userModel = require('./models/user.js');
const postModel = require('./models/post.js')
const upload = require('./config/userConfig.js')
const multer = require('multer');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// const { uploadUserImg } = require('./cloud/userCloud.js')
const path = require('path');
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');

////Create the account or register the user
app.get('/', (req, res) => {
  res.render('index');
})
app.post('/register', upload.single('userImage'), async (req, res) => {
  // const filePath = req.file.path;
  // const absolutePath = path.resolve(filePath);
  // console.log(absolutePath);
  // console.log(absolutePath)
  // await uploadUserImg(absolutePath);
  let { username, name, email, password } = req.body;
  let existUser = await userModel.findOne({ email: email })
  if (existUser) return res.redirect('/login');
  bcrypt.genSalt(12, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      await userModel.create({
        name: name,
        username: username,
        email: email,
        password: hash,
        profileImage: req.file.filename
      });
      let token = jwt.sign({ email: email }, 'secret');
      res.cookie('token', token);
      res.redirect('/profile');
    });
  });
});


//log in the user

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/userLogin',async (req, res) => {
  let { email, password } = req.body;
  let existUser=await userModel.findOne({email:email})
  bcrypt.compare(password, existUser.password , function (err, result) {
    if(result)
    {
      let token=jwt.sign({email:email},'secret')
      res.cookie('token',token);
      res.redirect('/profile');
    }else{
      res.send('something went wrong');
    }
  });
});


//profile

app.get('/profile', (req, res) => {
  res.render('profile')
})






//logout route
app.get('/logout', (req, res) => {
  res.cookie('token', '');
  res.redirect('/');
})





app.listen(port, () => {
  console.log(`Example app listening on port port`)
})



// const filePath = req.file.path;

// // Upload to Cloudinary
// const result = await cloudinary.uploader.upload(filePath, {
//   folder: 'uploads' // optional folder in Cloudinary
// });

// // Delete local file after upload
// fs.unlink(filePath, (err) => {
//   if (err) {
//     console.error('Error deleting local file:', err);
//   } else {
//     console.log('Local file deleted successfully');
//   }
// });

// res.json({
//   success: true,
//   imageUrl: result.secure_url
// });
