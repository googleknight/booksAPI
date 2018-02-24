module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('booklikes', ['bookid'], {
      type: 'foreign key',
      name: 'custom_fkey_bookid_relation',
      references: { // Required field
        table: 'books',
        field: 'bookid',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('booklikes', 'custom_fkey_bookid_relation');
  },
};
