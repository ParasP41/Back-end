const express = require('express')
const multerConfig =require('./config/multerConfig.js');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.json({ message: 'POST request received', data: req.body });
});


app.listen(port, () => {
  console.log(`Example app listening on port port`)
})