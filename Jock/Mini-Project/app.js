const express = require('express')
const path = require('path');
const userModel = require('./models/user.js');
const postModel = require('./models/post.js')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const post = require('./models/post.js');
const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')))
app.use(cookieParser());


app.get('/', (req, res) => {
  res.render("index");
})

app.post('/register', async (req, res) => {
  let { username, name, email, password, age } = req.body;
  let existUser = await userModel.findOne({ email: email })
  if (existUser) return res.status(500).send("User already exist");
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let user = await userModel.create({
        username,
        name,
        email,
        password: hash,
        age,
      })
      let token = jwt.sign({ email: email, userid: user._id }, 'secret');
      res.cookie('token', token);
      res.redirect('/profile')
    });
  });
});

app.get('/login', (req, res) => {
  res.render('login')
})


app.get('/profile', isLoggedIn, async (req, res) => {
  // res.send("profile")
  let user = await userModel.findOne({ email: req.user.email }).populate('post')
  res.render('prof', { user: user });
  // res.render('prof')
})

app.post('/post', isLoggedIn, async (req, res) => {
  let { content } = req.body;
  let user = await userModel.findOne({ email: req.user.email });
  if (content === "") {

  } else {
    let post = await postModel.create({
      user: user._id,
      content: content,
    })
    user.post.push(post._id);
    await user.save();
    res.redirect('/profile')
  }
});




app.post('/login', async (req, res) => {
  let { email, password } = req.body;
  let existUser = await userModel.findOne({ email: email });
  if (!existUser) return res.status(500).send("Something went wrong");
  bcrypt.compare(password, existUser.password, async (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: existUser._id }, 'secret');
      res.cookie('token', token);
      // res.status(200).send('logged in')
      res.status(200).redirect('/profile')
    }
    res.redirect('/login');
  })

})

app.get('/logout', (req, res) => {
  res.cookie('token', '');
  res.redirect('/login')
})



app.get('/edit/:id', isLoggedIn,async (req, res) => {
  let id=req.params.id;
  let post=await postModel.findOne({_id:id}).populate('user');
  
  await post.save();
  res.render('edit',{post:post});
})

app.post('/update/:id',isLoggedIn, async (req, res) => {
  let {content}=req.body;
  let id=req.params.id;
  let post=await postModel.findOneAndUpdate(
    {_id:id},
    {content:content},
    {new: true}
  )
  res.redirect('/profile')
});


app.get('/like/:id', isLoggedIn,async (req, res) => {
  let id=req.params.id;
  let post=await postModel.findOne({_id:id}).populate('user');
  if(post.likes.indexOf(req.user.userid)===-1)
  {
    post.likes.push(req.user.userid)
  }else{
    post.likes.splice(post.likes.indexOf(req.user.userid),1)
  }
  await post.save();
  res.redirect('/profile');
})




app.get('/delete/:id',isLoggedIn, async (req, res) => {
  let id = req.params.id;
  let post = await postModel.findOneAndDelete({ _id: id })
  let user = await userModel.findOne({ _id: post.user });
  user.post = user.post.filter((item) => { return item.toString() !== id.toString() });
  await user.save();
  res.redirect('/profile')
})

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") {
    res.redirect('/login');
  }
  else {
    let data = jwt.verify(req.cookies.token, 'secret');
    req.user = data;
    next();
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port port`)
})
