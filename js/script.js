/* script.js */

const myLibrary = [];
const bookElements = [];
const bookContainer = document.querySelector(".book-container");
const bookDialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-book");
const dialogCloseBtn = document.querySelector(".dialog-close");

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

    dialogCloseBtn.addEventListener("click", () => {

        bookDialog.close();
    });
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

            alert("Removing " + listBook.title);
            removeBookFromLibrary(listBook);
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