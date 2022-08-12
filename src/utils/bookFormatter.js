export const formatter = (foreignbook) => {
  const book = {};
  (book._id = foreignbook.id),
    (book.category = foreignbook.volumeInfo.categories
      ? foreignbook.volumeInfo.categories[0]
      : ""),
    (book.cover = foreignbook.volumeInfo.imageLinks
      ? foreignbook.volumeInfo.imageLinks.thumbnail
      : "https://books.google.mn/googlebooks/images/no_cover_thumb.gif"),
    (book.description = foreignbook.volumeInfo.description),
    (book.isbn = foreignbook.volumeInfo.industryIdentifiers
      ? foreignbook.volumeInfo.industryIdentifiers[0].identifier
      : "ISBN:"),
    (book.publisher = {
      cover: "",
      description: "",
      name: foreignbook.volumeInfo.authors,
    }),
    (book.rating = foreignbook.volumeInfo.averageRating),
    (book.release_date = foreignbook.volumeInfo.publishedDate),
    (book.title = foreignbook.volumeInfo.title),
    (book.comments = []);
  return book;
};
