const mongoose=require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/dataAssociation`);

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    age:Number,
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post',
        }//this mean that the type is Id
    ],
})

module.exports=mongoose.model('user',userSchema)