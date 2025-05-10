const express = require('express');
const app = express();
const userModel = require('./userModel.js')
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.get('/create', async (req, res) => {
    let createUser = await userModel.create({
        name: "Paras",
        username: "ParasP41",
        email: "parasvp41@gmail.com",
    });
    res.send(createUser);
});

app.get('/update', async (req, res) => {
    let updateUser = await userModel.findOneAndUpdate(
        { username: "ParasP41" },
        { name: "Prince_Pyiush", },
        { new: true });
    res.send(updateUser);
});

app.get('/read', async (req, res) => {
    //find will give you the array of the user obj if user not present it will give you empty array
    //findone will give you the first user obj if user not present it will give you null
    // let readUser = await userModel.find({ name: "Paras" });
    let readUser = await userModel.find();
    res.send(readUser);
})

app.get('/delete', async () => {
    let deleteUser = await userModel.findOneAndDelete({ name: "Paras" });
   res.send(deleteUser)
})




app.listen("3000");