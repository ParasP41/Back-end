const mongoose = require('mongoose');

let postSchema=mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now,
    },
    title:{
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    image:{
        type:String,
        require:true
    },
})

module.exports= mongoose.model('post',postSchema)