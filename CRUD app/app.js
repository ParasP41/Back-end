const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user.js')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/create', async (req, res) => {
    let { name, email, imgurl } = req.body;
    await userModel.create({
        name: name,
        email: email,
        imgUrl: imgurl,
    })
    res.redirect('/read')
})

app.get('/read', async (req, res) => {
    let allUsers = await userModel.find()
    res.render("read", { users: allUsers });
})

app.get('/delete/:id', async (req, res) => {
    let id = req.params.id;
    await userModel.findByIdAndDelete(id);
    res.redirect('/read')
})

app.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    let user = await userModel.findOne({ _id: id })
    res.render('edit', { user: user })
})

app.post('/update/:id', async (req, res) => {
    let id = req.params.id;
    await userModel.findOneAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.email,
        imgUrl: req.body.imgurl
    },
        {
            new: true
        })
    res.redirect('/read')
})
app.listen("3000");