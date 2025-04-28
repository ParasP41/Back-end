const express = require('express')
const path=require('path');
const cookieParser=require('cookie-parser')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'./public')))
app.set('view engine','ejs');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
