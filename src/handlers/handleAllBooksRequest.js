const mergeRating = require('./helpers/mergeRating');
const rp = require('request-promise');
const groupByAuthor = require('./helpers/groupByAuthor');

const booksurl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';

function handleAllBooksRequest() {
  return rp.get(booksurl)
    .then(allBooksData => mergeRating(allBooksData))
    .then(allPromises => Promise.all(allPromises))
    .then(allBooks => groupByAuthor(allBooks));
}
module.exports = { handleAllBooksRequest, groupByAuthor };

