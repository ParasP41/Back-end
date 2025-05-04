const express = require('express')
const path=require('path');
const cookieParser=require('cookie-parser')
const db=require('./config/mongooseConnection.js')
require('dotenv').config();
const expressSession=require('express-session');
const flash=require('connect-flash');
// Router
const userRouter =require('./routes/userRouter.js')
const ownersRouter=require('./routes/ownersRouter.js')
const indexRouter=require('./routes/index.js')
const productsRouter=require('./routes/productsRouter.js')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(
  expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
  })
)
app.use(flash());
app.use(express.static(path.join(__dirname,'./public')))
app.set('view engine','ejs');

app.use('/owners',ownersRouter);
app.use('/',indexRouter);
app.use('/users',userRouter)
app.use('/products',productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
