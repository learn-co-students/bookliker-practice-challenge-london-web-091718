const getBooks = () =>
  fetch('http://localhost:3000/books')
    .then(resp => resp.json())

const getUsers = () =>
  fetch('http://localhost:3000/users')
    .then(resp => resp.json())

const updateBook = (book) =>
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  }).then(resp => resp.json())
