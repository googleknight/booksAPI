

module.exports = (sequelize, DataTypes) => {
  const booklikes = sequelize.define('booklikes', {
    bookid: DataTypes.INTEGER,
    opinion: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return booklikes;
};
