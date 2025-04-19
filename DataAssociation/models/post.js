const mongoose = require('mongoose');
const user = require('./user');

// mongoose.connect(`https//127.0.0.1:27017/dataAssociation`);

const postSchema = mongoose.Schema({
    postdata: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date:{
        type:Date,
        default:Date.now()
    }
})



module.exports = mongoose.model('post', postSchema)