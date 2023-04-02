let library = [];

const toggle = document.querySelector('#toggle-form');
const formDiv = document.querySelector('#form');
const submitButton = document.querySelector('#button-input');

const displayButton = document.querySelector('#button-display');

function testFunc() {
    if (formDiv.style.display === 'none') {
        formDiv.style.display = 'block';
    } else if (formDiv.style.display === 'block') {
        formDiv.style.display = 'none';
    }
}

function Book(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
}

// Prototype for deleting a book, not sure if there's a way/reason to use it instead of the current deleteBook method
Book.prototype.delete = function () {
    const currentBook = document.querySelector(`[data-id="${this.index}"]`);
    currentBook.remove();
};

Book.prototype.toggleRead = function () {
    const currentReadDiv = document.querySelector(`#read${this.index}`);
    // change the value in the object, then update the card
    if (this.read) {
        this.read = false;
        currentReadDiv.innerHTML = 'false';
    } else {
        this.read = true;
        currentReadDiv.innerHTML = 'true';
    }
};

for (let i = 0; i < 3; i++) {
    const newTitle = `title${i}`;
    const newAuthor = `title${i}`;
    const newPages = i;
    const newRead = true;
    const index = library.length;
    const newBook = new Book(newTitle, newAuthor, newPages, newRead, index);
    library = library.concat(newBook);
}

function deleteBook(bookIndexId) {
    const book = document.querySelector(`[data-id="${bookIndexId}"]`);
    book.remove();
}

function addBookToHTML(book, index) {
    // **change to createDocumentFragment() after it is working**

    // add a .card to #card-display
    const display = document.querySelector('#card-display');
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.dataset.id = index;
    display.appendChild(newCard);

    // add a .card-info-div to .card
    const newCardInfoDiv = document.createElement('div');
    newCardInfoDiv.classList.add('card-info-div');
    newCard.appendChild(newCardInfoDiv);

    // later replace with something else? //
    // eslint-disable-next-line
    for (const key in book) {
        // repeat this 4 times, one for each value of the object
        // add a .card-heading to .card-info-div, give it the value/text (Title/Author/Pages/Read)
        const newCardHeading = document.createElement('div');
        newCardHeading.classList.add('card-heading');
        newCardHeading.innerHTML = key; // change to object key
        newCardInfoDiv.appendChild(newCardHeading);

        // add a .card-info .card-info.div, give it the value/text (library[item].title/.author etc)
        const newCardInfo = document.createElement('div');
        newCardInfo.dataset.id = index;
        newCardInfo.setAttribute('id', `${key}${index}`);
        newCardInfo.classList.add('card-info');
        newCardInfo.innerHTML = book[key]; // change to object value
        newCardInfoDiv.appendChild(newCardInfo);
    }

    const newCardRemoveButton = document.createElement('button');
    newCardRemoveButton.classList.add('card-remove-button');
    newCardRemoveButton.innerHTML = 'Delete Entry';
    newCardRemoveButton.value = index;
    newCard.appendChild(newCardRemoveButton);

    newCardRemoveButton.addEventListener('click', function () {
        deleteBook(this.value);
    });
}

// Will remove all the books, not sure if it's useful though
// perhaps simpler to remove then re-add card-display?
function removeAllBooks() {
    const books = document.querySelectorAll('[data-id]');
    console.log(books);
    if (books) {
        books.forEach((index) => deleteBook(index));
    }
}

function displayBooks() {
    // run addBookToHTML for each item in the library
    library.forEach((book, index) => addBookToHTML(book, index));
}

function makeBook() {
    // collect the input values
    const title = document.querySelector('#title-input').value;
    const author = document.querySelector('#author-input').value;
    const pages = document.querySelector('#pages-input').value;
    const radioButtonGroup = document.getElementsByName('readyesno');
    const checkedRadio = Array.from(radioButtonGroup).find(
        (radio) => radio.checked
    );
    const read = checkedRadio.value;

    // use the constructor to make a new Book object
    const index = library.length;
    const newBook = new Book(title, author, pages, read, index);

    // add the object to the library array
    library = library.concat(newBook);
    addBookToHTML(newBook, index);
}

toggle.addEventListener('click', testFunc);
submitButton.addEventListener('click', makeBook);
displayButton.addEventListener('click', displayBooks);
