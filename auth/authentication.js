const jwt = require('jsonwebtoken');
const { responseMessage } = require('../response/message');
const protect = (req, res, next) => {
         let token = req.headers.authorization;
         if (!token) {
                  res.status(404).json({
                           status: 'fail',
                           message: responseMessage.error.provideToken
                  })
         }

         try {
                  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
                  req.reuestData = decoded;
                  next();
         } catch (ex) {
                  res.status(400).send('Invalid token');
         }
}
module.exports = protect;