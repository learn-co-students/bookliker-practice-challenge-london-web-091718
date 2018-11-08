const booksList = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')

const state = {
  books: [],
  doneReadingBook: false,
  removeBook: false
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
  const foundUser = book.users.find(user => user.id === currentUser.id)
  showPanel.innerHTML =
  `<h4>${book.title}</h4>
  <img src='${book.img_url}'/>
  <p>${book.description}</p>
  <div class="users-list">
  ${book.users.map(user => `<p class="users" data-id=${user.id} ><strong>${user.username}</strong></p>`).join('')}
  </div>
  <button data-id='${book.id}' class='read-btn'>Read Book</button>
  ${foundUser ? `<button data-id='${book.id}' class='remove-btn'>Remove Book</button>` : ''}
  `
}

const addCurrentUserEventListener = () => {
  const usersList = document.querySelector('.users-list');
  const currentUserParagraph = document.createElement('p');
  currentUserParagraph.dataset.id = `${currentUser.id}`
  currentUserParagraph.innerHTML = `<strong>${currentUser.username}</strong>`
  usersList.appendChild(currentUserParagraph)
}

const checkIfDoneReadingBook = book => {
  state.doneReadingBook = book.users.map(user =>
    user.username).includes(currentUser.username)
  return state.doneReadingBook
}

//check if the user is added to the book or not
const removeUserFromBook = book => {
  state.removeBook = book.users.map(user =>
    user.username).includes(currentUser.username)
  return state.removeBook
}

//adds the remove button when user clicks on the read button
const addUserRemoveBtn = book => {
  const removeBtn = document.createElement('button')
  removeBtn.className = 'remove-btn'
  removeBtn.dataset.id = `${book.id}`
  removeBtn.innerText = 'Remove Book'
  showPanel.appendChild(removeBtn)
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
    if(checkIfDoneReadingBook(foundBookToAddUser) && removeUserFromBook(foundBookToAddUser)) {
      alert('You read this already!')
    } else {
      foundBookToAddUser.users.push(currentUser)
      addCurrentUserEventListener(currentUser)
      addUserRemoveBtn(foundBookToAddUser)
      updateBookWithUser(foundBookToAddUser)
    }
  }

  if(event.target.className === 'remove-btn') {
    const removeBookId = event.target.dataset.id
    const foundBookToRemove = findBook(removeBookId)
    foundBookToRemove.users.splice(foundBookToRemove.users.findIndex(el => el.username === currentUser.username), 1)
    displayBookInfo(foundBookToRemove)
    updateBookWithUser(foundBookToRemove)
  }

})
