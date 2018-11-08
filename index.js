const BOOKS_URL = "http://localhost:3000/books"
const USERS_URL = "http://localhost:3000/users"
const bookListPanel = document.getElementById('list-panel')
const bookList = document.getElementById('list')
const showPanel = document.getElementById('show-panel')
// TODO: change to "state" array
let allBooks = []
let allUsers = []
let me

const getAllBooks = () => {
  allBooks = []
  return fetch(BOOKS_URL)
  .then(res => res.json())
  .then(books => books.forEach(book => {
    allBooks.push(book)
  }))
}

const renderAllBooks = () => {
  allBooks.forEach(book => renderBookLi(book))
}

const getAllUsers = () => {
  fetch(USERS_URL)
  .then(res => res.json())
  .then(users => users.forEach(user => {
    allUsers.push(user)
  }))
  .then(() => me = allUsers.find(user => user.id === 1))
}

const renderBookLi = (book) => {
  let bookLi = document.createElement('li')
  bookLi.dataset.id = book.id
  bookLi.className = "list-item"
  bookLi.innerHTML = book.title
  bookList.appendChild(bookLi)
}

const showBook = (book) => {
  showPanel.innerHTML = ""
  let bookInfo = document.createElement('div')
  bookInfo.id = `Book - ${book.id}`
  bookInfo.dataset.id = book.id
  bookInfo.innerHTML = `
    <h2>${book.title}</h2>
    <img src="${book.img_url}" alt="${book.title}">
    <p>${book.description}</p>
    <h5>List of users who like this book:</h5>
    <p id="user-list">${book.users.map(user => "<span data-id="+user.id+">"+user.username+"</span>").join("")}</p>
    <button id="like-this-book">Like Book</button>
  `
  showPanel.appendChild(bookInfo)
}

const updateBook = (bookBtn) => {
  let bookDiv = bookBtn.parentElement
  let usersHolder = bookDiv.querySelector('#user-list')
  let userSpans = usersHolder.querySelectorAll('span')
  
  let book = allBooks.find(b => b.id === parseInt(bookDiv.dataset.id))
  let userIds = [...userSpans].map(span => parseInt(span.dataset.id))
  let users = allUsers.filter(user => userIds.includes(user.id))
  let updatedUsers = users.includes(me) ? 
                      users.filter(user => user !== me) :
                      [...users, me]

  return fetch(`${BOOKS_URL}/${book.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({users: updatedUsers})
  })
  .then( res => res.json())
  .then( book => {
    usersHolder.innerHTML = `${book.users.map(user => "<span data-id="+user.id+">"+user.username+"</span>").join("")}`
  })
}

const init = () => {
  getAllBooks().then(()=>renderAllBooks())
  getAllUsers()
  bookListPanel.addEventListener('click', (e) => {
    if(e.target.className === "list-item") {
      let selected = allBooks.find(book => book.id === Number(e.target.dataset.id))
      showBook(selected)
    }
  })
  showPanel.addEventListener('click', (e) => {
    if (e.target.id === "like-this-book") {
      updateBook(e.target)                 
    }
  })
}

document.addEventListener("DOMContentLoaded", init);