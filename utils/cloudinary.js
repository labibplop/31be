const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dwemc12oy', 
  api_key: '857391741581342', 
  api_secret: 'fg_NSh_6V6DKCguFQg0yNGzj8lM' 
});

exports.uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result;
  } catch (error) {
    console.error(error);
  }
};
