import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb){
    cb(null,`${Date.now()}-${file.originalname}`)
  }
})

export const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    const extension = path.extname(file.originalname)    
    if(extension !== '.png' && extension !== '.jpg'){
      return cb(new Error("Tipo de archivo no soportado.",{cause: "Tipo de archivo no soportado."}))
    }
    cb(null, true)
  },

}).single("imgProduct")