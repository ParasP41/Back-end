const crypto = require('crypto');
const multer = require('multer');
const path=require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/postImage');
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12,(err,bytes)=>
    {
        const fn=bytes.toString('hex')+path.extname(file.originalname);
        cb(null,fn)
    })
    }
  })
  
  const uploadPost = multer({ storage: storage })

module.exports=uploadPost;

