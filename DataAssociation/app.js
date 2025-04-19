const express=require('express');
const app=express();
const userModel=require('./models/user.js')
const postModel=require('./models/post.js');
const post = require('./models/post.js');

app.get('/',(req,res)=>
{
    res.send('Hello')
})

app.get('/create',async (req,res)=>
{
    const user = await userModel.create({
        username: "Paras",
        email: "parasvp41@gmail.com",
        age: 19,
    });
    res.send(user);
})


app.get('/post/create',async (req,res)=>
{
    let post=await postModel.create({
        postdata:"hello kisa hoo",
        user:"68037d3b3657042c64fbafa9",
    })

    let user=await userModel.findOne({_id:"68037d3b3657042c64fbafa9"})
     user.posts.push(post._id);
    await user.save;

    res.send({post,user});
})

app.listen(3000);