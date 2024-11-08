import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, 'public/productImages');
    },
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})

export const uploadImages = upload.fields([
    {name:"thumbnail", maxCount:1},
    {name:"images", maxCount:5}
])