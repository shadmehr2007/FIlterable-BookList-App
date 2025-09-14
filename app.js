// Book Class
class Books {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Store Class 
 class Store {
    static getBooks(){
        let books; 
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBooks(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBooks(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
 }

// UI Class
class UI {
    static displayBooks(e){
        e.preventDefault();
        const books = Store.getBooks();

        books.forEach((book) => {
            UI.addBookToList(book);
        })
    }

  static addBookToList(book) {
    const row = document.createElement("tr");
    const bookList = document.getElementById("bookList");
    row.className = 'book';
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete text-white bg-red-500 py-1 px-2 rounded-sm">X</a></td>
        `;

    bookList.appendChild(row);
  }
  static showAlert(message, id) {
    const div = document.createElement("div");
    const main = document.getElementById('main');
    const form = document.getElementById('form');
    if (id === "danger") {
      div.className = "alert bg-red-500 py-2 px-4 my-2 rounded-sm text-white mx-auto";
    } else if(id === 'success'){
      div.className = "alert bg-green-600 py-2 px-4 my-2 rounded-sm text-white mx-auto";
    }
    div.appendChild(document.createTextNode(message));
    main.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static clearFields(){
    const title = document.getElementById('title').value = '';
    const author = document.getElementById('author').value = '';
    const isbn = document.getElementById('isbn').value = '';
    
  }
  static deleteBook(el){
    if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
    }
  }
}

// Add Book
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  if (title == "" || author == "" || isbn == "") {
    UI.showAlert("Please fill in the Fields", "danger");
  } else {
    const book = new Books(title, author, isbn);
    UI.addBookToList(book);
    UI.showAlert('Book added', 'success');
    Store.addBooks(book);
  }
  UI.clearFields();
});


// Delete Book 
const bookList = document.getElementById('bookList');
bookList.addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
})


document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Filter Books
const filterInput = document.getElementById('filterInput');
filterInput.addEventListener('keyup', filterItems);
function filterItems(){
    const filterValue = document.getElementById('filterInput').value.toUpperCase();
    const books = document.querySelectorAll('.book');
    books.forEach((book) => {
        const bookValue = book.firstElementChild.textContent.toUpperCase();
        console.log(bookValue);
        if(bookValue.indexOf(filterValue) === -1){
            book.style.display = 'none';
        } else {
            book.style.display = '';
        }
    })
}