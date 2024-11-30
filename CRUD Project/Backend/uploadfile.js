const cloudinary = require('cloudinary')
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.uploadFile = async (data)=>{
  const fileArray = Object.values(data)
  console.log("fileArray>>>>>",fileArray);
  const results = []
  
  for (const file of fileArray) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream((result, error) => {
              if (error) {
                reject(error);
              }
              resolve(result);
            }
          ).end(file.data)
        })
        
        console.log("<<daat>>",file.data)
          results.push(result)
    
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    
      return results;
    };

