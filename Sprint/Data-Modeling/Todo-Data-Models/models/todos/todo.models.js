import { Timestamp } from "bson";
import mongoose from mongoose;
import { User } from "./user.models";
import { SubTodo } from "./sub_todo.models";

const todoSchema=new mongoose.Schema({
    content:{
      type:String,
      required:true,
    },
    complete:{
      type:true,
      default:false,
    },
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:User
    },
    subTodos:[
      {
        type:mongoose.Schema.Type.ObjectId,
        ref:SubTodo
      }
    ],
},{timestamps:true})

export const Todo=mongoose.model("Todo",todoSchema);