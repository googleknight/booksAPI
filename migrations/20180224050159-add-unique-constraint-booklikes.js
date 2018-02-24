

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('booklikes', ['bookid'], {
      type: 'unique',
      name: 'custom_unique_bookid_booklikes',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('booklikes', 'custom_unique_bookid_booklikes');
  },
};
