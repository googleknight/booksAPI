const Models = require('../../models');

function getBooksWithLikes() {
  return Models.book.findAll({
    attributes: ['bookid', 'author', 'name', 'rating'],
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
              author: book.author,
              name: book.name,
              rating: book.rating,
              like: bookLike ? bookLike.opinion : false,
            }));
      });
    });
}
function handleBooksWithLikes() {
  return getBooksWithLikes()
    .then(allPromises => Promise.all(allPromises));
}

module.exports = handleBooksWithLikes;
