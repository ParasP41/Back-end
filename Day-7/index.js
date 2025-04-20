const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    fs.readdir(`./files`, (err, files) => {
        res.render('index', { files: files });
    })
})
app.post('/create', (req, res, next) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.description, (err) => {
        res.redirect('/');
    })
})

app.get('/files/:blob', (req, res, next) => {
    fs.readFile(`./files/${req.params.blob}`, 'utf-8', (err, data) => {
        res.render('show', { filename: req.params.blob, filedata: data })
    })
})

app.get('/edit/:blob', (req, res, next) => {
    res.render('edit', { prevname: req.params.blob })
})

app.post('/edit', (req, res, next) => {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}.txt`, (err) => {
        res.redirect('/');
    })
})

app.listen('4000', () => {
    console.log('Running')
});