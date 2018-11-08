// all elements needed

const bookList = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')
const listPanel = document.querySelector('#list-panel')



//render 1 book
const renderBook = (book) =>{
  const bookLi = document.createElement('li')
  bookLi.innerHTML =`
  <p class = book-li data-book-id=${book.id} >${book.title}</p>
  `
  bookList.appendChild(bookLi)
}
//render ALL books
const renderBooks = (books) =>{
  books.forEach(book =>
  renderBook(book))
}



const bookInfo = (book) => {
  const createEl = document.createElement('div')
  const bookUsers = book.users.map(user => user.username).join('</p><p>')
  createEl.innerHTML = `
  <h3>${book.title}</h3>
  <img src=${book.img_url}></img>
  <br>
  <br>
  <description>${book.description}</description>
  <br>
  <br>
  <users><b>${bookUsers}</b></users>
  <br>
  <br>
  <button>Read Book</button>
  `
  showPanel.appendChild(createEl)

  createEl.querySelector('button').addEventListener('click', event => {
      if (!book.users.some(user => user.id === adrian.id)) {
        book.users.push(adrian)
        showPanel.innerHTML = ``
        debugger
        bookInfo(book)
        updateBook(book)
      }
    })
}

bookList.addEventListener('click', event => {
  let bookId = parseInt(event.target.dataset.bookId)

  let theBook = localBooks.find(book => book.id === bookId)
  showPanel.innerHTML = ``

  bookInfo(theBook)
})



getBooks()
  .then(books => {
    localBooks = [...books]
    renderBooks(localBooks)
  })


getUsers()
 .then(users => {
   localUsers = [...users]
   adrian = localUsers[0]
   })
