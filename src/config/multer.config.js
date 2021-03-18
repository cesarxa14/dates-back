const multer = require('multer');
const path = require("path");

const upload = multer({dest:'upload',
    storage: multer.diskStorage({
        destination:'upload',
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null,file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
        }
    })
})
module.exports = upload;
