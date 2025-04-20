const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render('index', { files: files })
    })
})

app.post('/addtask', (req, res) => {
    let { taskName, taskDescription } = req.body;
    fs.writeFile(`./files/${taskName}.txt`, `${taskDescription}`, (err) => {
        res.redirect('/');
    })
})

app.get('/read/:filename', (req, res) => {
    let filename = req.params.filename;
    fs.readFile(`./files/${filename}`, 'utf-8', (err, result) => {
        res.render('read', { filename: filename, desc: result })
    })
})

app.get('/edit/:filename', (req, res) => {
    let filename = req.params.filename;
    fs.readFile(`./files/${filename}`, 'utf-8', (err, result) => {
        res.render('edit', { filename: filename, desc: result })
    })
})

app.post('/edit/:filename', (req, res) => {
    let filename = req.params.filename;
    let { title, description } = req.body;
    fs.rename(`./files/${filename}`, `./files/${title}.txt`, (err) => {
        fs.writeFile(`./files/${title}.txt`, description, (err) => {
            res.redirect('/')
        })
    })
})

app.get('/delete/:filename', (req, res) => {
    let filename = req.params.filename;
    fs.unlink(`./files/${filename}`, (err) => {
        res.redirect('/');
    })
})


app.listen(3000);