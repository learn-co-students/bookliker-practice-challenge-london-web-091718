const getData = (url) => 
    fetch(url)
    .then(response => response.json())

const patchData = (url, book) => {
    return fetch(`${url}/${book.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    })
    .then(response => response.json())
}