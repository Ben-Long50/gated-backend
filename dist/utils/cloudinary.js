import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});
export const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: '/gated',
                quality: 'auto:eco',
            });
            fs.unlink(req.file.path, (error) => {
                if (error)
                    console.error('Error deleting temp file:', error);
            });
            req.body.picture = JSON.stringify({
                imageUrl: result.secure_url,
                publicId: result.public_id,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Error uploading to Cloudinary',
            });
        }
    }
    next();
};
export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result === 'ok') {
            return result;
        }
        throw new Error('Error deleting image');
    }
    catch (error) {
        console.error(error);
    }
};
export default cloudinary;
