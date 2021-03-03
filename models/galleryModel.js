
module.exports = (sequelize, Sequelize) => {
         const album = sequelize.define('album', {
                  albumId: {
                           type: Sequelize.INTEGER,
                           autoIncrement: true,
                           primaryKey: true,

                  },
                  userId: {
                           type: Sequelize.INTEGER,
                  },
                  albumName: {
                           type: Sequelize.STRING,
                  },
                  // imageAttachment: {
                  //          type: Sequelize.STRING,
                  // },
                  albumDescription: {
                           type: Sequelize.STRING,
                  }
         });

         return album;
}

