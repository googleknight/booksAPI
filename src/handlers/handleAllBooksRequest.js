const mergeRating = require('./helpers/mergeRating');
const rp = require('request-promise');

const booksurl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';

function groupByAuthor(allBooks) {
  const groupedBooks = allBooks.reduce((booksList, book) => {
    booksList[book.Author] = booksList[book.Author] || [];
    booksList[book.Author].push(book);
    return booksList;
  }, Object.create(null));
  return groupedBooks;
}
function handleAllBooksRequest() {
  return rp.get(booksurl)
    .then(allBooksData => mergeRating(allBooksData))
    .then(allPromises => Promise.all(allPromises))
    .then(allBooks => groupByAuthor(allBooks));
}
module.exports = { handleAllBooksRequest, groupByAuthor };

