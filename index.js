const listEl = document.querySelector("#list")
const bookContainer = document.querySelector('#show-panel')

// states for our objects
const state = {
    books: [],
    user: { "id": 1, "username": "pouros" }
}

// add event listner for click
document.addEventListener("click", (event) => {
    if (event.target.className === "book-title") {
        const id = event.target.dataset.id
        console.log(parseInt(id))
        const foundBook = state.books.find(book => book.id === parseInt(id))
        bookContainer.innerHTML = ""
        renderShowBook(foundBook)
    }

    if (event.target.className === "read-book") {
        const id = event.target.dataset.id
        console.log(id)
        const foundBook = state.books.find(book => book.id === parseInt(id))
        userReadBook(foundBook)
        // if (!foundTheName(foundBook, foundBook.users)) {
        //         foundBook.users.push({ "id": 1, "username": "pouros" })
        //         updateBook(foundBook)
        //         bookContainer.innerHTML = ""
        //         renderShowBook(foundBook)
        //     } else {
        //         alert("You have already read this book!")
        //     }
    }
})

// renders a book
const userReadBook = book => {
    if (book.users.find(user => user.id === state.user.id)) {
        book.users.pop()
        updateBook(book)
        bookContainer.innerHTML = "" // make sure you empty the book contrainer, before you render book so it updates
        renderShowBook(book)
        return
    } else {
        book.users.push({ "id": 1, "username": "pouros" })
        updateBook(book)
        bookContainer.innerHTML = "" // make sure you empty the book contrainer, before you render book so it updates
        renderShowBook(book)
    }
}


// hard code the user name at the top, and check if the user name is in the array,
// checking for the object wont work, as they will have different ids from database
const foundTheName = (book, array) => {
    return array.includes(arrayBook => arrayBook.user.username === book.users.username )
}

// render users into a list form
const renderUsers = (book) => {
    return string = book.users.map(user => 
       `<li>${user.username}</li>`
).join(" ")
}

// add a new book to the show page, we call our render book
const renderShowBook = (book) => {
    const bookDiv = document.createElement("div")
    book.className = "book-show-page"

    bookDiv.innerHTML = `
        <img src=${book.img_url} />
        <h5>${book.title}</h5>
        <p>${book.description} </p>
        <button class="read-book" data-id=${book.id}> Read Book </button>
        ${renderUsers(book)}
    `
    bookContainer.appendChild(bookDiv)
}

// render a single book
const renderBook = (book) => {
    const bookItem = document.createElement("li")
    bookItem.classList.add("book-title")

    bookItem.innerHTML = `
    <p class="book-title" data-id=${book.id}>${book.title}<p>
    `
    listEl.appendChild(bookItem)
}

// render all the books
const renderAllBooks = (books) =>
    books.forEach(book => renderBook(book))

// get all the books an display them on the page 
getBooks()
    .then(books => {
        state.books = [...books]
        renderAllBooks(books)
    })

