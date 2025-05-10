// import express from 'express'
const express = require('express');

const app = express()

app.use((req,res,next)=>{
    console.log("middleware chala")
    next();//that will forward the request route
});

// app.use //matlab bar bar chalao

app.get('/', (req, res) => {
  res.send('Hello World')
})

//app.get //matlab given route chalao

app.get('/home', (req, res,next) => {
//   res.send('Home Hello World')
  return next(new Error('something went wrong'));
})

app.use((err,req,res,next)=>
{
    console.error(err.stack);
    res.status(500).send('Something broke!')
})

app.listen(3000)