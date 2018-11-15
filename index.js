//add book title to page
const listEl = document.querySelector('#list')
const getBooks = () => fetch(`http://localhost:3000/books`).then(resp=>resp.json())
const bookTitleEl = document.createElement('h1')
const bookImageEl = document.createElement('img')
const bookDescriptionEl = document.createElement('p')
const bookLikeButtonEl = document.createElement('button')
const bookLikesEl = document.createElement('ul')
const state = {
    books: [],
    user: {id:1, username:"pouros"},
}



const appendBook = (book) => {
    bookEl = document.createElement('li')
    listEl.appendChild(bookEl)
    bookEl.innerHTML= `<li data-id = ${book.id}>${book.title}</li>`
    
    bookEl.addEventListener('click', () => {
        renderBook(book)    
    })
}


const renderBook = (book) => {
    bookTitleEl.innerText=`${book.title}`
    bookPanelEl.appendChild(bookTitleEl)

    bookImageEl.src=`${book.img_url}`
    bookPanelEl.appendChild(bookImageEl)

    bookDescriptionEl.innerText=`${book.description}`
    bookPanelEl.appendChild(bookDescriptionEl)

    const bookLikers = book.users.map(user => user.username).join('</p>')
    bookLikesEl.innerHTML=`${bookLikers}`
    bookPanelEl.appendChild(bookLikesEl)

    bookLikeButtonEl.innerText=`Like`
    bookLikeButtonEl.setAttribute('data-id', `${book.id}`)
    bookPanelEl.appendChild(bookLikeButtonEl)

    bookLikeButtonEl.addEventListener('click',()=>{
        let currentBook = state.books.find(book=>book.id===parseInt(bookLikeButtonEl.dataset.id))
        currentBook.users.push(state.user)
        console.log(currentBook)
        addLikeToServer(currentBook).then(()=>{
            bookLikesEl.innerHTML += `<p>${state.user.username}</p>`
        })
    
    })
}


const appendBooks = (books) => books.forEach(book => {
    state.books=[...books]
    appendBook(book)
})

getBooks().then(books=> appendBooks(books))
//add book details to show panel
const bookPanelEl =  document.querySelector('#show-panel')

const addLikeToServer = (book) => fetch(`http://localhost:3000/books/${book.id}`,{
    method : 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({users: [...book.users]})
})

// const reloadItems = () => getBooks().then(books=> appendBooks(books))