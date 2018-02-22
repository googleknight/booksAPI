const Models = require('../../models');
const groupByAuthors = require('./helpers/groupByAuthor');

function getBooksWithLikes() {
  return Models.book.findAll({
    attributes: ['bookid', 'author', 'name', 'rating'],
    order: ['author'],
  })
    .then((result) => {
      const booksWithLikes = result;
      return booksWithLikes.map((book) => {
        const bookWithLike = book;
        return Models.booklikes.findOne({
          where: {
            bookid: book.bookid,
          },
        })
          .then(bookLike =>
            ({
              bookid: book.bookid,
              Author: book.author,
              name: book.name,
              rating: book.rating,
              like: bookLike ? bookLike.opinion : false,
            }));
      });
    });
}
function handleBooksWithLikes() {
  return getBooksWithLikes()
    .then(allPromises => Promise.all(allPromises))
    .then(allBooks => groupByAuthors(allBooks));
}

module.exports = handleBooksWithLikes;
