
module.exports = (sequelize, Sequelize) => {
         const user = sequelize.define('user', {
                  userId: {
                           type: Sequelize.INTEGER,
                           autoIncrement: true,
                           primaryKey: true,

                  },
                  firstName: {
                           type: Sequelize.STRING,
                  },
                  lastName: {
                           type: Sequelize.STRING,
                  },
                  email: {
                           type: Sequelize.STRING,
                  },
                  password: {
                           type: Sequelize.STRING,
                  },
                  state: {
                           type: Sequelize.STRING,
                  },
                  city: {
                           type: Sequelize.STRING,
                  }
         });

         return user;
}

