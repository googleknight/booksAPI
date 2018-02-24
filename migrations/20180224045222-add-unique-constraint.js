

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('books', ['bookid'], {
      type: 'unique',
      name: 'custom_unique_bookid',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('book', 'custom_unique_bookid');
  },
};
