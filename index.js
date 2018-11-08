document.addEventListener("DOMContentLoaded", function() {});
let listBody = document.querySelector('#list-panel')
let bookList = listBody.querySelector('#list')
let showPanel = document.querySelector('#show-panel')

getBook()
    .then(resp => resp.forEach(book => {
        renderBooks(book)
    }))

let user = {
    id: 1,
    username: "pouros"
}
    
const renderBooks = (book) => {
    const list = document.createElement('li')
    list.innerHTML = `
        <h3>${book.title}</h3>
    `
    bookListner(list, book)
    bookList.appendChild(list)
}

const showBookDetails = book => {
    showPanel.innerHTML = ""
        const innerDiv = document.createElement('div')
        showPanel.innerHTML = `
            <h2>${book.title}</h2>
            <img src=${book.img_url}>
            <h3>${book.description}</h3>
            <h4>${book.users.map(user => " " + user.username )}</h4>
        `
        innerDiv.innerHTML = `
            <button type="button">Read Me</button>
        `
        readMe(innerDiv, book)

        showPanel.appendChild(innerDiv)
}

const bookListner = (list, book) => {
    list.addEventListener('click', 
   () => {
       showBookDetails(book)
   })
}

const readMe = (innerDiv, book) => {
    innerDiv.addEventListener('click', () => {
        book.users.push(user)
        // changing users array
        likeBook(book)
        showBookDetails(book)
    })
}