function groupByAuthor(allBooks) {
  const groupedBooks = allBooks.reduce((booksList, book) => {
    booksList[book.Author] = booksList[book.Author] || [];
    booksList[book.Author].push(book);
    return booksList;
  }, Object.create(null));
  return groupedBooks;
}
module.exports = groupByAuthor;
