const express = require('express')
const path = require('path');
const userModel = require('./models/user.js');
const postModel = require('./models/post.js')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
      res.send('created')
    });
  });
});

app.get('/login', (req, res) => {
  res.render('login')
})


app.get('/profile',isLoggedIn, (req, res) => {
  console.log(req.user)
  res.send('Hello World!')
})



app.post('/login', async (req, res) => {
  let { email, password } = req.body;
  let existUser = await userModel.findOne({ email: email });
  if (!existUser) return res.status(500).send("Something went wrong");
  bcrypt.compare(password, existUser.password, async (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: existUser._id }, 'secret');
      res.cookie('token', token);
      res.status(200).send('logged in')
    }
    res.redirect('/login');
  })

})

app.get('/logout', (req, res) => {
  res.cookie('token', '');
  res.redirect('/login')
})

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") {
    res.send("you must be logged in");
  }
  else {
    let data=jwt.verify(req.cookies.token,'secret');
    req.user=data;
  }
  next();
}

app.listen(port, () => {
  console.log(`Example app listening on port port`)
})
