const rp = require('request-promise');

const ratingurl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/';
function mergeRating(allBooksData) {
  const allBooks = JSON.parse(allBooksData).books;
  const allBookswithRatings = allBooks.map((book) => {
    const updatedBook = book;
    return rp.get(ratingurl + book.id)
      .then((ratingsdata) => {
        const rating = JSON.parse(ratingsdata).rating;
        updatedBook.rating = rating;
        return updatedBook;
      });
  });
  return allBookswithRatings;
}
module.exports = mergeRating;
