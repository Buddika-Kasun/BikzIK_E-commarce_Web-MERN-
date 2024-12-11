import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    //secure: true,
    //use_ssl: true,
    //cname: 'binkeyit.com'
});

const uploadImageCloudinary = async(image) => {

    const buffer = image?.buffer || Buffer(await image.arrayBuffer());

    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            folder: 'binkeyit',
            //public_id: `binkeyit_${Date.now()}`,
            //format: 'jpg',
            //width: 800,
            //height: 600,
            //crop: 'fill',
            //quality: 100
        }, (error, uploadResult) => {
            if (error) {
                reject(error);
            } else {
                resolve(uploadResult);
            }
        }).end(buffer);
    });

    return uploadImage;

};

export default uploadImageCloudinary;