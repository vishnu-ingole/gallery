
var path = require('path');
const multer = require('multer');
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads');
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   }
});

function fileFilter(req, file, cb) {
   let ext = path.extname(file.originalname);
   if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      req.fileValidationError = "Check your file  extension";
      return cb(null, false, req.fileValidationError);
   }
   cb(null, true)
}
const upload = multer({
   storage: storage,
   limits: { fileSize: 1000000 },
   fileFilter: fileFilter
});

module.exports = upload;