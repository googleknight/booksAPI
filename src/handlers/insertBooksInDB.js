const mergeRating = require('./helpers/mergeRating');
const rp = require('request-promise');
const Models = require('../../models');

const booksurl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';

function writeinDB(allBooks) {
  allBooks.forEach((book) => {
    Models.book.create({
      bookid: book.id,
      author: book.Author,
      name: book.Name,
      rating: book.rating,
    });
  });
  return allBooks;
}
function checkExistingEntriesInDB() {
  const promise = new Promise((resolve, reject) => {
    Models.book.findAll()
      .then((result) => {
        if (result.length === 0) { resolve('emptytable'); } else { reject('nonempty'); }
      });
  });
  return promise;
}
function insertBooksinDB() {
  return checkExistingEntriesInDB()
    .then(responsemessage => rp.get(booksurl)
      .then(allBooksData => mergeRating(allBooksData))
      .then(allPromises => Promise.all(allPromises))
      .then(allBooks => writeinDB(allBooks)));
}
function insertBooksinDBWithoutCheck() {
  return rp.get(booksurl)
    .then(allBooksData => mergeRating(allBooksData))
    .then(allPromises => Promise.all(allPromises))
    .then(allBooks => writeinDB(allBooks))
    .then(allPromises => Promise.all(allPromises));
}
module.exports = { insertBooksinDB, insertBooksinDBWithoutCheck };
