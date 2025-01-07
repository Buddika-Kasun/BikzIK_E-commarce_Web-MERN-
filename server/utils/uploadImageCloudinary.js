import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    //secure: true,
    //use_ssl: true,
    //cname: 'BikzIK.com'
});

const uploadImageCloudinary = async(image) => {

    const buffer = image?.buffer || Buffer(await image.arrayBuffer());

    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            folder: 'BikzIK',
            //public_id: `BikzIK_${Date.now()}`,
            //format: 'jpg',
            width: 500,
            height: 500,
            crop: 'fill',
            quality: 100
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