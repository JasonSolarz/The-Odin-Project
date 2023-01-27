const main = document.querySelector("main");
const addBookButton = document.querySelector("#add_book");
const section = document.querySelector("section");
const formButton = document.querySelector("#form_button");

section.style.display = "none";

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let myLibrary = [];

myLibrary.push(new Book('Horus Rising', "Dan Abnett", "412", true));
myLibrary.push(new Book('False Gods', "Graham McNeill", "406", true));
myLibrary.push(new Book('Galaxy in Flames', "Ben Counter", "407", false));

function addBookToLibrary(Book) {
  myLibrary.push(Book);
}

function printBooks() {
  main.innerHTML = "";
  myLibrary.forEach((book, index) => {
    createBookCard(book, index);
  })
}

function createBookCard(book, index) {
  const div = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const options = document.createElement("div");
  const deleteButton = document.createElement("button");
  const readButton = document.createElement("button");

  div.classList.add("card");
  div.dataset.id = `${index}`;

  title.textContent = book.title;
  title.classList.add("title");
  div.appendChild(title);

  author.textContent = book.author;
  author.classList.add("author");
  div.appendChild(author);

  pages.textContent = book.pages;
  pages.classList.add("pages");
  div.appendChild(pages);

  options.classList.add("options");
  div.appendChild(options);

  options.appendChild(readButton);
  readButton.classList.add("read_book_button");
  readButton.textContent = "Read";

  options.appendChild(deleteButton);
  deleteButton.textContent = "X";
  deleteButton.classList.add("remove_book_button");

  main.appendChild(div);

  readButton.addEventListener("click", () => {
    readButton.classList.toggle("read");
  })
  deleteButton.addEventListener("click", () => {
    main.removeChild(div);
    updateDataSet();
    myLibrary.splice(div.dataset.id, 1);
  })

  if (book.read == true) {
    readButton.classList.add("read");
  } else {
    readButton.classList.remove("read");
  }

}

function updateDataSet() {
  for (let lcv = 0; lcv < main.childElementCount; lcv++) {
    main.childNodes[lcv].dataset.id = lcv;
  }
}

addBookButton.addEventListener("click", () => {
  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
})

function addBook() {
  const bookTitle = document.querySelector("#book_title");
  const bookAuthor = document.querySelector("#book_author");
  const bookPages = document.querySelector("#book_pages");
  const bookRead = document.querySelector("#book_read");
  if (bookTitle.value == "" || bookAuthor.value == "" || bookPages.value == "" || bookRead.value == "") {
    alert("Please fill out the form completely.");
  } else {
    addBookToLibrary(new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value));
    printBooks();
    clearForm();
  }
}

function clearForm() {
  const bookTitle = document.querySelector("#book_title");
  const bookAuthor = document.querySelector("#book_author");
  const bookPages = document.querySelector("#book_pages");
  const bookRead = document.querySelector("#book_read");
  section.style.display = "none";
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookRead.value = "";
}

formButton.addEventListener("click", addBook);

printBooks();