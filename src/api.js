const booksURL = ' http://localhost:3000/books'

const getBooks = () =>
  fetch(`${booksURL}`)
    .then(resp => resp.json())

const getBook = id =>
  fetch(`${booksURL}/${id}`)
    .then(resp => resp.json())

const updateBookWithUser = book =>
  fetch(`${booksURL}/${book.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(book)
  })
