import mongoose from 'mongoose';

mongoose.connect("mongodb://127.0.0.1:27017/CRUDapp")

const todoSchema = mongoose.Schema({
    imageurl: String,
    title: String,
    description: String
})

export const todoModel = mongoose.model('todo', todoSchema);

