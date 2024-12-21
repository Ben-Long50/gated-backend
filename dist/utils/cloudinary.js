var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export const uploadToCloudinary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        try {
            const result = yield cloudinary.uploader.upload(req.file.path, {
                folder: '/gated',
                quality: 'auto:eco',
            });
            fs.unlink(req.file.path, (error) => {
                if (error)
                    console.error('Error deleting temp file:', error);
            });
            req.body.publicId = result.public_id;
            req.body.imageUrl = result.secure_url;
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
});
export const deleteFromCloudinary = (publicId) => {
    try {
        const result = cloudinary.uploader.destroy(publicId);
        if (result.result === 'ok') {
            return result;
        }
        throw new Error('Error deleting image');
    }
    catch (error) {
        console.error(error.message);
    }
};
export default cloudinary;
