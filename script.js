// our book constructor
class Book {
  constructor(author, title, pages, was_read, price) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.was_read = was_read;
    this.price = price;
  }
}

// initialize our library and our display
let myLibrary = [];

function addBookToLibrary(author, title, pages, was_read, price) {
  const newBook = new Book(author, title, pages, was_read, price);
  myLibrary.push(newBook);
}

function addBook(event) {
  event.preventDefault(); // prevents default form submission behavior

  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const pages = document.getElementById("pages").value;
  const price = document.getElementById("price").value;
  const was_read = document.getElementById("read").checked;

  if (author.length == 0 || title.length == 0) {
    return;
  }

  addBookToLibrary(author, title, pages, was_read, price);
  refreshScreen();
}

function displayBooks() {
  const bookContainer = document.getElementById("book-container");

  refreshBooks();

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.id = book.title;

    bookDiv.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Price: $${book.price}</p>
      <p>${book.was_read ? "Already read" : "Not read yet"}</p>
      <button onclick="changeReadStatus(${index})">Change Read Status</button>
      <button onclick="removeBook(${index}, '${book.title}')">Remove</button>
    `;

    bookContainer.appendChild(bookDiv);
  });
}

function changeReadStatus(index) {
  myLibrary[index].was_read = myLibrary[index].was_read ? false : true;
  refreshScreen();
}

function removeBook(index, title) {
  let undesiredBook = document.getElementById(title);

  undesiredBook.remove();
  myLibrary.splice(index, 1);
  myDisplay.splice(index, 1);
  refreshScreen();
}

function clearForm() {
  document.getElementById("author").value = "";
  document.getElementById("title").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("price").value = "";
  document.getElementById("read").checked = false;
}

function toggleForm() {
  let form = document.getElementById("form-container");

  form.className == "hidden"
    ? form.classList.remove("hidden")
    : form.classList.add("hidden");
}

function refreshBooks() {
  const bookContainer = document.getElementById("book-container");

  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.firstChild);
  }
}

function refreshScreen() {
  displayBooks();
  clearForm();
}

addBookToLibrary("Someone", "The Default Book", 260, false, 300);
displayBooks();
