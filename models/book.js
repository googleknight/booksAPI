module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    bookid: DataTypes.INTEGER,
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    rating: DataTypes.REAL,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return book;
};
