import express from 'express';
import {userModel} from './models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');

app.get('/', (req, res) => {
   res.render('index')
})

app.post('/create',async (req, res) => {
    let { username,email,password,age}=req.body;
    const userEmail = await userModel.findOne({ email: email });
    if(email!=userEmail.email)
    {
        bcrypt.genSalt(10,  function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                const user= await userModel.create({
                    username,
                    email,
                    password:hash,
                    age,
                })
            });
        });
        let token=jwt.sign({email:email},'secret')
        res.cookie("token",token);
        res.render('logout');
    }else{
        res.send("Email already in use");
    }
})

app.get('/login',(req,res)=>
{
    res.render('login');
})

app.post('/login',async (req,res)=>
{
    let { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    bcrypt.compare(`${password}`,`${user.password}`,(err,result)=>
    { 
        if (result) {
            let token=jwt.sign({email:email},'secret');
            res.cookie("token",token);
            res.render('logout');
        }else{
            res.send("erre");
        }
    })
})

app.get('/logout',(req,res)=>
{
    res.clearCookie("token");
    res.redirect('/');
})

app.listen(3000)