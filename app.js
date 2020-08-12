// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constractor
function UI() {}
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};
// Show Alert method
UI.prototype.showAlert = function (msg, className) {
  // create div alert
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;

  // add text
  const text = document.createTextNode(msg);

  //Append the text
  div.appendChild(text);

  // Append div to the before form
  const container = document.querySelector(".container");

  const form = document.querySelector("#book-form");

  container.insertBefore(div, form);

  // set timeout
  setTimeout(function () {
    const alert = document.querySelector(".alert");
    alert.remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear method
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
// Event listener for books addition
document.getElementById("book-form").addEventListener("submit", function (e) {
  // get input value
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // instantiate Book
  const book = new Book(title, author, isbn);

  // instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please add book", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // clear fileds
    ui.clearFields();
    // Book add alert
    ui.showAlert("Book added!", "success");
  }
  e.preventDefault();
});

// Event listener for delete books
document.getElementById("book-list").addEventListener("click", function (e) {
   // instantiate UI
  const ui = new UI();
  // Delete book 
  ui.deleteBook(e.target);
  // Show Alert
  ui.showAlert("Book removed", "success");
  e.preventDefault();
});
