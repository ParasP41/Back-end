const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dg65hvb6r', 
    api_key: '373646217715977', 
    api_secret: ' fkj3l4k23j4l23j4lk23j4lk23j4lk2'
});

const uploadUserImg = async (filePath) => {
        const result = await cloudinary.uploader.upload(filePath);
        console.log(result);
        return result; 
};

module.exports = { uploadUserImg };

