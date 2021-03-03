
var router = require("express").Router();
const users = require('../controller/usersController');
const album = require('../controller/albumController');
const protect = require('../auth/authentication.js');
const upload = require('../auth/fileUpload')
router.post("/users", users.validate('createUsers'), users.createUsers);
router.get("/users", users.validate('login'), users.login);
router.post("/create-album",  protect,album.createAlbum);
router.get('/fetch-album', protect,album.getUserGallery);
router.post('/image',protect,upload.array('photos', 25), album.postImages);
router.get('/image',protect, album.getUserImages)
module.exports = router;