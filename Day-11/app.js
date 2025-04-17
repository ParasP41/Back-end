// const cookieParser=require('cookie-parser')
const express = require('express');
const bcrypt=require('bcrypt');
const app = express();

// app.use(cookieParser())

app.get('/',(req,res)=>
{
    // res.cookie('name','Paras')
    // bcrypt.genSalt(10,(err,salt)=>
    // {
    //     bcrypt.hash("Paras@P41",salt,(err,hash)=>
    //     {
    //         console.log(hash)
    //     })
    // })

    bcrypt.compare('Paras@P41','$2b$10$oLSdncHMmvpuGcIMfWtK0.N4xkG.0vb3EN7R0aFMayod2oFUvmxEu',(err,result)=>
    {
        console.log(result);
    })
    res.send("Done 👍");
})
// app.get('/send',(req,res)=>
// {
//     // console.log(req.cookies);
//     res.send("Send Done 👍")
// })

app.listen('3000',()=>
{
    console.log("App is Running at Port 3000 ⇌")
});