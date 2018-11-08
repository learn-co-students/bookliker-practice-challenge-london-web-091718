//get books 
const getBook = () => {
    return fetch('http://localhost:3000/books')
        .then(resp => resp.json())
}

const likeBook = (book) => {
    return fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    })
}