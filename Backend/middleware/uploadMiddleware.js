import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

export const upload = multer({ storage });










// import multer from "multer";
// import path from "path";
//
// const storage = multer.diskStorage({
//     destination:function (req, file,cb){
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
//
// const fileFilter = (req, file, cb)=> {
//     if(file.mimetype.startsWith("image/")){
//         cb(null, true);
//     }else{
//         cb(new Error("Only images are allowed"), false);
//     }
// };
//
// export const upload = multer({storage, fileFilter})
// import multer from "multer";
// import path from "path";
//
// // Set storage engine
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Store files in the "uploads" folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
//     }
// });
//
// // File filter to allow only images
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only image files are allowed!"), false);
//     }
// };
//
// // Initialize Multer
// export const upload = multer({ storage, fileFilter });
