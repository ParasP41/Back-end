const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const userModel = require('./models/user.js')
const jwt=require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "./public")))
app.set('view engine', 'ejs');
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/create', (req, res) => {
    const { username, email, password, age } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const user = await userModel.create({
                username: username,
                email: email,
                password: hash,
                age: age
            })
            let token=jwt.sign({email:email},"Secret");
            res.cookie("token",token);
            res.send(user);
        });
    });
})

app.get('/login',(req,res)=>
{
    res.render('login')
})

app.post('/login',async (req,res)=>
{
    const {email,password}=req.body;
    let user=await userModel.findOne({email:email})
    if(!user) return res.send('something went wrong');
    bcrypt.compare(password,user.password,(err ,result)=>
    {
        if(result) {
            let token=jwt.sign({email:email},"Secret");
            res.cookie("token",token);
            res.send("yes logged in")
         }
            else res.send("you cannot log in")
    })
})

app.get('/logout',(req,res)=>
{
    res.cookie("token","");
    res.redirect('/')
})

app.listen('3000');