const submitButton = document.querySelector('#submitButton');

const titleValue = document.querySelector('#title');
const authorValue = document.querySelector('#author');
const genreValue = document.querySelector('#genre');
const pagesValue = document.querySelector('#pages');
const yearValue = document.querySelector('#year');
const readValue = document.querySelector('#read');

const dialog = document.querySelector('dialog');
const showDialog = document.querySelector('#new-book');
const form = document.querySelector('form');

const library = document.querySelector('.library');

const inputs = [titleValue, authorValue, genreValue, pagesValue, yearValue, readValue];

let myLibrary = [];
let id = 0;

function Book(title, author, genre, pages, year, id, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.year = year;
    this.id = id;
    this.read = read;
};

function addBookToLibrary() {
    title = titleValue.value;
    author = authorValue.value;
    genre = genreValue.value;
    pages = pagesValue.value;
    year = yearValue.value;
    read = readValue.checked;
    const book = new  Book (title, author, genre, pages, year, id, read);
    myLibrary.push(book);
};

showDialog.addEventListener('click', () => {
    dialog.showModal();
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (form.checkValidity() === false) {
        return;
    } else {
        addBookToLibrary();
        dialog.close();
    }
    id++;
    clearInputs();
    clearDOMCards();
    createDOMCards();
});

function clearInputs () {
    inputs.forEach(input => {
        input.value = '';
    });
    readValue.checked = false;
};

function createDOMCards () {
    myLibrary.forEach( book => {
        
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        library.appendChild(bookCard);

        const card = document.createElement('div');
        card.classList.add('card');
        bookCard.appendChild(card);

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');

        const titleText = document.createElement('h2');
        titleText.textContent = `Title: ${book.title}`;
        bookInfo.appendChild(titleText);

        const authorText = document.createElement('h3');
        authorText.textContent = `Author: ${book.author}`;
        bookInfo.appendChild(authorText);

        const genreText = document.createElement('h4');
        genreText.textContent = `Genre: ${book.genre}`;
        bookInfo.appendChild(genreText);

        const pagesText = document.createElement('p');
        pagesText.textContent = `Page count: ${book.pages}`;
        bookInfo.appendChild(pagesText);

        const yearText = document.createElement('p');
        yearText.textContent = `Year released: ${book.year}`;
        bookInfo.appendChild(yearText);

        const removeBook = document.createElement('button');
        removeBook.classList.add('bin');
        card.appendChild(removeBook);

        removeBook.addEventListener('click', () => { // <-----------------------------------------
            const index = myLibrary.findIndex(element => element.id === book.id);
            myLibrary.splice(index,1);

            clearDOMCards();
            createDOMCards();
        }) //FINISH THIS!

        card.appendChild(bookInfo);

        const readButton = document.createElement('button');
        readButton.classList.add('read-toggle');

        
        if (book.read === false) {
            readButton.textContent = 'Not read';
            readButton.classList.add('read-toggle-notread')
        } else {
            readButton.textContent = 'Read';
            readButton.classList.add('read-toggle-read')
        };

        readButton.addEventListener('click', () => {
            if (book.read === true) {
                readButton.textContent = 'Not read';
                readButton.classList.remove('read-toggle-read');
                readButton.classList.add('read-toggle-notread');
                book.read = false;
            } else if (book.read === false){
                readButton.textContent = 'Read';
                readButton.classList.remove('read-toggle-notread');
                readButton.classList.add('read-toggle-read');
                book.read = true;
            };
        });

        bookCard.appendChild(readButton);

    });
};

function clearDOMCards () {
    while (library.firstChild) {
        library.removeChild(library.firstChild);
    }
}

