/* script.js */

const myLibrary = [];
const bookElements = [];
const bookContainer = document.querySelector(".book-container");
const addBookBtn = document.querySelector(".add-book");

const bookDialog = document.querySelector("dialog");
const dialogSubmitBtn = document.querySelector(".dialog-submit");
const dialogCloseBtn = document.querySelector(".dialog-close");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pageCountInput = document.getElementById("page-ct");
const readInput = document.getElementById("read");

let libID = 0;

displayInitialBooks();
generateDialog();

function displayInitialBooks() {

    addBookToLibrary(new Book("Moby Dick", 
                                "Herman Melville", 
                                427, 
                                false));

    addBookToLibrary(new Book("Midnight in the Garden of Good and Evil", 
                                "John Berendt", 
                                416, 
                                true));

    addBookToLibrary(new Book("Beloved", 
                                "Toni Morrison", 
                                324, 
                                true));

    updateBookDisplay();
}

function Book(title, author, pageCt, read) {

    this.title = title;
    this.author = author;
    this.pageCount = pageCt;
    this.hasBeenRead = read;
    this.index = -1;

    const randomColor = 
            "#" + Math.floor(Math.random() * 16777215).toString(16);

    this.bookColor = randomColor;
}

function generateDialog() {

    addBookBtn.addEventListener("click", () => {

        bookDialog.showModal();
    });

    dialogSubmitBtn.addEventListener("click", submitBook, false);
    dialogCloseBtn.addEventListener("click", cancelBookCreation, false);
}

function submitBook(event) {

    // Prevent default dialog closure
    event.preventDefault();

    // Check for errors
    let alertMessage = "Unable to complete book.\n";
    let foundError = false;

    if(titleInput.value.length < 1) {

        alertMessage += "* Missing a title\n";
        foundError = true;
    }

    if(authorInput.value.length < 1) {

        alertMessage += "* Missing an author\n";
        foundError = true;
    }

    if(pageCountInput.value.length < 1
        || pageCountInput.value > 100000) {

        alertMessage += "* Invalid page count; please enter a number between 1 and 100,000\n";
        foundError = true;
    }

    // Error alert
    if(foundError) {

        alert(alertMessage);
        return;
    }

    let newBook = new Book(titleInput.value, 
                            authorInput.value, 
                            pageCountInput.value, 
                            readInput.value);

    addBookToLibrary(newBook);
    updateBookDisplay();

    // Reset dialog values
    titleInput.value = "";
    authorInput.value = "";
    pageCountInput.value = "";
    readInput.value = false;
    
    bookDialog.close();
}

function cancelBookCreation(event) {

    // Prevent default dialog closure
    event.preventDefault();

    // Reset dialog values
    titleInput.value = "";
    authorInput.value = "";
    pageCountInput.value = "";
    readInput.value = false;
    
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

            toggleHasBeenRead(myLibrary[i]);
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
    title.style.fontSize = "1.6em";
    title.style.textAlign = "center";
    title.style.fontWeight = "800";
    title.style.overflowWrap = "anywhere";
    title.textContent = book.title; // Max 36 Char

    let author = document.createElement("div");
    author.style.textAlign = "center";
    author.style.overflowWrap = "anywhere";
    author.textContent = "By " + book.author;

    let pageCt = document.createElement("div");
    pageCt.style.textAlign = "center";
    pageCt.textContent = "Pages: " + book.pageCount;

    let read = document.createElement("div");
    read.style.textAlign = "center";
    read.textContent = (book.hasBeenRead ? "Already Read" : "Not Yet Read");
    read.style.backgroundColor = (book.hasBeenRead ?
                                    "rgba(0,255,0,0.1)" : "rgba(255,0,0,0.1)");

    book.bookElement.appendChild(title);
    book.bookElement.appendChild(author);
    book.bookElement.appendChild(pageCt);
    book.bookElement.appendChild(read);
}

function toggleHasBeenRead(book) {

    book.hasBeenRead = !book.hasBeenRead;
    updateBookDisplay();
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