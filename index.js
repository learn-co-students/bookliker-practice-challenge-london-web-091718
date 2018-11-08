const bookList = document.querySelector('#list')
const bookContainer = document.querySelector('#show-panel')
const bookURL = 'http://localhost:3000/books'
const userURL = 'http://localhost:3000/users'
let state = {
    books: [],
    users: { "id": 1, "username": "pouros" }
}

document.addEventListener("DOMContentLoaded", function() {
    getData(bookURL)
        .then(books => {
            state.books = books
            renderBooks(books)
        })
});

// Single book
const renderBook = book => {
    const bookItem = document.createElement('li')
    bookItem.classList.add('book-item')
    bookItem.innerHTML = `<p data-book-id=${book.id} class='book-element'>${book.title}</p>`
    // Added 'data-book-id' above and 'class' for later reference in event listener.

    bookList.appendChild(bookItem)
}

// All books
const renderBooks = books =>
    books.forEach(book => renderBook(book))

// Add event listener for all the books
document.addEventListener('click', event => {
    if (event.target.className === 'book-element') {
        const bookID = event.target.dataset.bookId
        const foundBook = state.books.find(book => book.id === parseInt(bookID))
        bookContainer.innerHTML = ''
        // Above we clear show page before we call 'showBook()' below
        showBook(foundBook)
    }

    if (event.target.className === 'read-book-button') {
        const readBookButton = event.target.dataset.bookId
        const readFoundBook = state.books.find(book => book.id === parseInt(readBookButton))
        if (readFoundBook.users.find(user => user.id === state.users.id)) {
            alert('You have already read this book you mug!')
            return
        }
        readFoundBook.users.push(state.users)
        bookContainer.innerHTML = ''
        patchData(bookURL, readFoundBook)
        showBook(readFoundBook)
    }
})

// to render specific book, find it and apply new re4nder func to render specfic book.
const showBook = book => {
    const bookDiv = document.createElement('div')
    bookDiv.classList.add('book-show-page')
    bookDiv.innerHTML = `
        <h3>${book.title}</h3>
        <img src='${book.img_url}'>
        <p>${book.description}</p>
        <button data-book-id=${book.id} class='read-book-button'>Read This Book</button>
        <p>${renderUsers(book)}</p>
    `
        //I added the above final line of code after adding the 'renderUsers()' function below.
    bookContainer.appendChild(bookDiv)
}

// Show users
const renderUsers = book => {
    return string = book.users.map(user =>
        `<li>${user.username}</li>`).join(' ')
}