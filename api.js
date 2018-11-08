
// get all the books
const getBooks = () =>
    fetch(`http://localhost:3000/books`)
        .then(resp => resp.json())


// // get all the users
// const getUsers = () =>
//     fetch(`http://localhost:3000/users`)
//         .then(resp => resp.json())

// update books object
const updateBook = (book) => 
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(book)
    })

// const booksUrl = "http://localhost:3000/books"
// const usersUrl = "http://localhost:3000/users"

// const getBooks = async (booksUrl) => {
//     const response = await fetch(booksUrl)
//     return response.json()
// }

