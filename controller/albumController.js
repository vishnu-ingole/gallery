
const db = require('../models/index');
const Image = db.image;
const Album = db.album;
Album.belongsTo(Image, { foreignKey: 'albumId' })
const { responseMessage } = require('../response/message');


exports.createAlbum = async (req, res) => {
         // validation
         // const errors = validationResult(req);
         // if (!errors.isEmpty()) {
         //          res.status(422).json({ errors: errors.array()[0].msg });
         //          return;
         // }
         let { userId, albumName, albumDescription } = req.body;

         let requestData = {
                  userId: userId,
                  albumName: albumName,
                  albumDescription: albumDescription
         }

         try {
                  Album.create(requestData)
                           .then(data => {
                                    res.status(201).json({
                                             status: 'success',
                                             message: responseMessage.success.dataAdded,
                                             result: {
                                                      data
                                             }

                                    })
                           });
         } catch (err) {
                  res.status(404).json({
                           status: 'fail',
                           message: responseMessage.error.dataNotAdded,
                  })
         }

};

exports.getUserGallery = async (req, res) => {
         const { userId } = req.query;
         try {
                  const Result = await Album.findAll({

                           where: {
                                    userId: userId
                           }

                  }
                  )
                  if (Result) {
                           res.status(201).json({
                                    status: 'success',
                                    data: {
                                             Result
                                    }
                           });
                  } else {
                           res.status(404).json({
                                    status: 'fail',
                                    message: responseMessage.error.dataNotFetch
                           })
                  }
         } catch (error) {

                  return res.status(500).json({ error: error.message })
         }



}
exports.postImages = async (req, res) => {

         let { albumId } = req.body;
         const photos = req.files;
         if (Object.entries(photos) < 1) {
                  res.json({
                           status: 'fail',
                           message: responseMessage.error.selectFile
                  })
         } else {
                  let data = [];
                  photos.map(async p => {
                           let imageData = {};
                           imageData.albumId = albumId;
                           imageData.name = p.originalname;
                           imageData.mimetype = p.mimetype;
                           data.push(Image.create(imageData))

                  });


                  Promise.all(data).then(data => {
                           res.status(201).json({
                                    status: 'success',
                                    message: responseMessage.success.dataAdded,


                           })
                  }).catch(err => {
                           res.status(500).json({
                                    status: 'fail',
                                    message: err.message
                           })
                  })
         }

}
exports.getUserImages = async (req, res) => {
         const { userId } = req.query;
         try {
                  const Result = await Album.findAll({

                           attributes:[],
                           include: [{
                                    attributes: ['name'],
                                    model: Image,
                                    required: true
                                  }],
                           where: {
                                    userId: userId
                           }

                  }
                  )
                  if (Result) {
                           res.status(201).json({
                                    status: 'success',
                                    data: {
                                             Result
                                    }
                           });
                  } else {
                           res.status(404).json({
                                    status: 'fail',
                                    message: responseMessage.error.dataNotFetch
                           })
                  }
         } catch (error) {

                  return res.status(500).json({ error: error.message })
         }



}