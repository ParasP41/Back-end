const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/iBlog`);

let userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    profileImage:{
        type:String,
        require,
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
        }
    ]
});

module.exports = mongoose.model('user', userSchema);