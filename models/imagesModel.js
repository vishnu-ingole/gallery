
module.exports = (sequelize, Sequelize) => {
         const image = sequelize.define('image', {
                  imageId: {
                           type: Sequelize.INTEGER,
                           autoIncrement: true,
                           primaryKey: true,

                  },
                  albumId: {
                           type: Sequelize.INTEGER,
                  },
                  name: {
                           type: Sequelize.STRING,
                  },
                  mimetype: {
                           type: Sequelize.STRING,
                  },

         });

         return image;
}

