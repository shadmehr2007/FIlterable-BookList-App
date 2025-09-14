// Book Class
class Books {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class
class UI {
  static addBookToList(book) {
    const row = document.createElement("tr");
    const bookList = document.getElementById("bookList");

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
  }
  UI.clearFields();
});
