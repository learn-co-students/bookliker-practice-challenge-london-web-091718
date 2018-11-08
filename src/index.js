const booksList = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')

const state = {
  books: [],
  doneReadingBook: false
}

const currentUser = {
  id: 1,
  username: 'pouros'
}

document.addEventListener("DOMContentLoaded", function() {

  getBooks()
    .then(books => {
      state.books = [...books]
      renderBooks(state.books)
    })

});


const renderBook = book => {
  const bookItem = document.createElement('li')
  bookItem.className = 'book-list'
  bookItem.dataset.id = `${book.id}`
  bookItem.innerHTML = `${book.title}`
  booksList.appendChild(bookItem)
}

const renderBooks = books => {
  books.forEach(book => renderBook(book))
}

const findBook = id =>
  state.books.find(book => book.id === parseInt(id))

const displayBookInfo = book => {
  showPanel.innerHTML =
  `<h4>${book.title}</h4>
  <img src='${book.img_url}'/>
  <p>${book.description}</p>
  <div class="users-list">
  ${book.users.map(user => '<p class="users"><strong>' + user.username + '</strong></p>').join('')}
  </div>
  <button data-id='${book.id}' class='read-btn'>Read Book</button>`
}

const addCurrentUserEventListener = () => {
  const usersList = document.querySelector('.users-list');
  const currentUserParagraph = document.createElement('p');
  currentUserParagraph.innerHTML = `<strong>${currentUser.username}<strong>`
  usersList.appendChild(currentUserParagraph)
}

const checkIfDoneReadingBook = book => {
  state.doneReadingBook = book.users.map(user => user.username).includes(currentUser.username)
  return state.doneReadingBook
}



document.addEventListener('click', event => {
  if(event.target.className === 'book-list') {
    const id = event.target.dataset.id
    const foundBook = findBook(id)
    displayBookInfo(foundBook)
  }

  if(event.target.className === 'read-btn') {
    const bookId = event.target.dataset.id
    const foundBookToAddUser = findBook(bookId)
    if(checkIfDoneReadingBook(foundBookToAddUser)) {
      alert('You read this already!')
    } else {
      foundBookToAddUser.users.push(currentUser)
      addCurrentUserEventListener()
      updateBookWithUser(foundBookToAddUser)
    }
  }

})
