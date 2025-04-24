import express from 'express';
import path from 'path';
import { todoModel } from './models/todo.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/create',async (req, res) => {
    let { imageUrl, title, description } = req.body;
    let todo=await  todoModel.create({
        imageurl: imageUrl,
        title: title,
        description: description
    })
    res.redirect('/todos')
})
app.get('/todos',async (req,res)=>
{
    let todo=await todoModel.find()
    res.render('todos',{todo:todo})
})

app.get('/delete/:id',async (req,res)=>{
    let id=req.params.id;
    let todo=await todoModel.findOneAndDelete({_id:id})
    res.redirect('/todos')
})

app.get('/edit/:id',async (req,res)=>
{
    let id=req.params.id;
    let todo=await todoModel.findOne({_id:id})
    res.render('edit',{todo:todo})
})

app.post('/update/:id',async (req,res)=>
{
    let id=req.params.id;
    let {imageUrl,title,description}=req.body;
    let todo=await todoModel.findOneAndUpdate(
        {_id:id},
        {
            title:title,
            description:description,
            imageurl:imageUrl
        },
        {new :true}
    )
    res.redirect('/todos')

})

app.listen(3000);