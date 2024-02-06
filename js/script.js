/* script.js */

const myLibrary = [];
const bookElements = [];
const bookContainer = document.querySelector(".book-container");
const addBookBtn = document.querySelector(".add-book");

const bookDialog = document.querySelector("dialog");
const dialogCloseBtn = document.querySelector(".dialog-close");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pageCountInput = document.getElementById("page-ct");
const readInput = document.getElementById("read");

let libID = 0;

DEBUG();
generateDialog();

function DEBUG() {

    for(let i = 0; i < 8; i++) {

        let title = "Book " + i.toString();
        let author = "James Gub";
        let count = 50 + Math.floor(Math.random() * 100);
        let read = Math.floor(Math.random() * 2) == 1;

        let newBook = new Book(title, author, count, read);

        addBookToLibrary(newBook);
    }

    updateBookDisplay();
}

function Book(title, author, pageCt, read) {

    this.title = title;
    this.author = author;
    this.pageCount = pageCt;
    this.hasBeenRead = read;
    this.index = -1;

    this.info = function() {

        console.log("***" + this.title + "***");
        console.log(this.author);
        console.log(this.pageCount);
        console.log(this.hasBeenRead);
        console.log(this.index);
    }

    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    this.bookColor = randomColor;
}

function generateDialog() {

    addBookBtn.addEventListener("click", () => {

        bookDialog.showModal();
    });

    dialogCloseBtn.addEventListener("click", closeBookDialog, false);
}

function closeBookDialog(event) {

    event.preventDefault();

    let newBook = new Book(titleInput.value, 
                            authorInput.value, 
                            pageCountInput.value, 
                            readInput.value);

    addBookToLibrary(newBook);
    updateBookDisplay();

    // Reset dialog values
    
    bookDialog.close();
}

function addBookToLibrary(book) {

    book.index = myLibrary.length;

    myLibrary.push(book);
}

function updateBookDisplay() {
    
    // Clear previous
    while (bookContainer.firstChild) {

        bookContainer.removeChild(bookContainer.lastChild);
    }

    // Add all book elements
    for(let i = 0; i < myLibrary.length; i++) {

        listBook = myLibrary[i];
        listBook.index = i;

        listBook.bookElement = document.createElement("div");
        listBook.bookElement.classList.add("book-display");
        listBook.bookElement.style.backgroundColor = listBook.bookColor;

        // Text elements
        addBookDisplayText(listBook);

        // Buttons
        let readBtn = document.createElement("button");

        readBtn.addEventListener("click", () => {

            toggleHasBeenRead(listBook);
        });

        readBtn.classList.add("book-button");
        readBtn.style.backgroundColor = "navy";
        readBtn.textContent = "Toggle Read";

        let removeBtn = document.createElement("button");

        removeBtn.addEventListener("click", () => {

            removeBookFromLibrary(i);
        });

        removeBtn.classList.add("book-button");
        removeBtn.style.backgroundColor = "red";
        removeBtn.textContent = "Remove Book";

        listBook.bookElement.appendChild(readBtn);
        listBook.bookElement.appendChild(removeBtn);

        bookElements.push(listBook.bookElement);
        bookContainer.appendChild(listBook.bookElement);
    }
}

function addBookDisplayText(book) {

    let title = document.createElement("div");
    title.style.fontSize = "1.75em";
    title.style.textAlign = "center";
    title.style.fontWeight = "800";
    title.style.wordBreak = "break-all";
    title.textContent = book.title.substring(0, 36); // Max 36 Char

    let author = document.createElement("div");
    author.style.textAlign = "center";
    author.textContent = "By " + book.author;

    let pageCt = document.createElement("div");
    pageCt.style.textAlign = "center";
    pageCt.textContent = "Pages: " + book.pageCount;

    let read = document.createElement("div");
    read.style.textAlign = "center";
    read.textContent = (book.read ? "Already Read" : "Not Yet Read");

    book.bookElement.appendChild(title);
    book.bookElement.appendChild(author);
    book.bookElement.appendChild(pageCt);
    book.bookElement.appendChild(read);
}

function toggleHasBeenRead(book) {

    book.hasBeenRead = !book.hasBeenRead;
}

function removeBookFromLibrary(index) {

    const arrayCopy = [];

    for(let i = 0; i < myLibrary.length; i++) {

        if(i != index) {

            arrayCopy.push(myLibrary[i]);
        }
    }

    myLibrary.length = 0;

    for(let i = 0; i < arrayCopy.length; i++) {

        myLibrary.push(arrayCopy[i]);
    }

    updateBookDisplay();
}

function closeDialog() {

}