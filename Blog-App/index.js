const express = require('express');
const userModel = require('./models/user.js');
const postModel = require('./models/post.js');
const uploadUser = require('./config/userConfig.js');
const uploadPost = require('./config/postConfig.js');
const multer = require('multer');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// const { uploadUserImg } = require('./cloud/userCloud.js')
const path = require('path');
const fs = require('fs');
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
app.post('/register', uploadUser.single('userImage'), async (req, res) => {
  // const filePath = req.file.path;
  // const absolutePath = path.resolve(filePath);
  // console.log(absolutePath);
  // console.log(absolutePath)
  // await uploadUserImg(absolutePath);
  let { username, name, email, password } = req.body;
  let existUser = await userModel.findOne({ email: email })
  if (existUser) {
    // If user already exists, delete the uploaded file
    if (req.file) {
      fs.unlink(path.resolve(req.file.path), (err) => {
        if (err) console.error('Error deleting file:', err);
        else console.log('Uploaded file deleted successfully.');
      });
    }
    return res.redirect('/login');
  }

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

app.post('/userLogin', async (req, res) => {
  let { email, password } = req.body;
  let existUser = await userModel.findOne({ email: email })
  bcrypt.compare(password, existUser.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: email }, 'secret')
      res.cookie('token', token);
      res.redirect('/profile');
    } else {
      res.send('something went wrong');
    }
  });
});


//profile
app.get('/profile', isLoggeddIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate('post');
  console.log(user)
  res.render('profile',{user:user});
});


//create the post at POST route
app.post('/createPost', isLoggeddIn, uploadPost.single('postImage'), async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  // console.log(req.user);
  let {title,content}=req.body;
  let user = await userModel.findOne({ email: req.user.email })
  // console.log(user);
  let post = await postModel.create({
    user: user._id,
    title: title,
    content: content,
    postImage: req.file.filename,
    like:user._id,
  })
  user.post.push(post._id);
  await user.save();
  res.redirect('/profile')
});


//delete the post
app.get('/delete/:id', isLoggeddIn,async (req, res) => {
  let id=req.params.id;
  let post=await postModel.findOneAndDelete({_id:id});
  let user=await userModel.findOne({_id:post.user});
  user.post=user.post.filter((item) => { return item.toString() !== id.toString() });
  await user.save();
  res.redirect('/profile')
});



//middleware for profile route or protected route
function isLoggeddIn(req, res, next) {
  if (req.cookies.token === "") {
    res.redirect('/login');
  } else {
    let data = jwt.verify(req.cookies.token, 'secret');
    req.user = data;
    next();
  }
}

//logout route
app.get('/logout', (req, res) => {
  res.cookie('token', '');
  res.redirect('/');
})




app.listen(port, () => {
  console.log(`Example app listening on port port`)
})

