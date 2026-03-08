import multer from 'multer';
import path from 'path';
import fs from 'fs';

// ✅ memory storage مش بيحفظ على الديسك على طول
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only! (jpeg, jpg, png, webp)'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

// ✅ function بتحفظ الصورة بس لما كل حاجة تبقى تمام
export const saveImage = (file) => {
  const uniqueName = `${Date.now()}-${file.originalname}`;
  const uploadPath = path.join('images', uniqueName);
  fs.writeFileSync(uploadPath, file.buffer);
  return uniqueName;
};

export default upload;