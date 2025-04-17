const express = require('express');
const fs = require('fs')
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    fs.readdir('./files', (err,data) => {
        res.render('index', { files: data })
    })
})
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${(req.body.title).split(" ").join('')}.txt`, `${req.body.description}`, (err) => {
        res.redirect('/')
    })
})

app.get('/files/:blob',(req,res)=>
{
    fs.readFile(`./files/${req.params.blob}`,'utf-8',(err,data)=>
    {
        res.render('read',{filename:req.params.blob,detail:data});  
    })
})

app.get('/edit/:blob',(req,res)=>
{
    res.render('edit',{prevname:req.params.blob})
})

app.post('/edit',(req,res)=>
{
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}.txt`, (err) => {
        res.redirect('/');
    })
})

app.listen('3000')