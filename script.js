const booksContainer = document.querySelector('#books-container');
const launchModalButton = document.querySelector('#launch-modal-button');
const form = document.querySelector('form');
const toggleButton = document.querySelector('#read');
const modal = document.querySelector('#modal');
const modalCloseButton = document.querySelector('#modal-close-button');
const inputs = document.querySelectorAll('input');
let booksCreated = 0;
let library = [];

function setUpEventListeners () {
    modalCloseButton.addEventListener('click', function() {
        toggleModal();
    })
    
    toggleButton.addEventListener('click', function() {
        formValues.read = !formValues.read;
    })
    
    launchModalButton.addEventListener('click', function () {
        toggleModal();
    })
    
    inputs.forEach(input => {
        input.addEventListener('focusout', function () {
            if (!input.checkValidity()) {
                input.classList.add('invalid-input');
            } else {
                input.classList.remove('invalid-input');
            }
        });
    })
    
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        formValues.title = document.querySelector('#title').value;
        formValues.author = document.querySelector('#author').value;
        formValues.pages = document.querySelector('#pages').value;
        new Book(formValues.title, formValues.author, formValues.pages, formValues.read);
        toggleModal();
        clearForm();
        renderLibrary();
    })
    
}

let formValues = {
    title: '',
    author: '',
    pages: '',
    read: false
}

function toggleModal () {
    if (modal.style.display === 'none') {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = ++booksCreated;
    addBookToLibrary(this);
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(bookToAdd) {
    library.push(bookToAdd);
}

function clearForm() {
    formValues.title = document.querySelector('#title').value = "";
    formValues.author = document.querySelector('#author').value = "";
    formValues.pages = document.querySelector('#pages').value = "";
    formValues.read = document.querySelector('#read').checked = false;
}


function renderLibrary() {
    booksContainer.textContent = "";
    library.forEach(book => {

        let newBookElement = document.createElement('div')
        newBookElement.classList.add('book');
        if (book.read) {
            newBookElement.classList.add('read');
        }
        
        newBookElement.setAttribute('data-id', book.id);

        let trashCan = document.createElement('img');
        trashCan.src = './icons/trash.png';
        trashCan.classList.add('trash');

        trashCan.addEventListener('click', function() {
            library = library.filter(bookToMap => {
                if (bookToMap.id !== book.id) {
                    return bookToMap;
                }
            })
            renderLibrary();
        })

        newBookElement.append(trashCan);

        booksContainer.append(newBookElement);
        let titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.textContent = book.title;
        newBookElement.append(titleDiv);


        let authorDiv = document.createElement('div');
        authorDiv.classList.add('author');
        authorDiv.textContent = book.author;
        newBookElement.append(authorDiv);

        let pageDiv = document.createElement('div');
        pageDiv.classList.add('pages');
        pageDiv.textContent = `${book.pages} pages`;
        newBookElement.append(pageDiv);

        let readButton = document.createElement('label');
        readButton.classList.add('toggle');
        newBookElement.append(readButton);

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('click', function() {
            newBookElement.classList.toggle('read');
            book.toggleRead();
        });
        readButton.append(checkbox);

        let slider = document.createElement('span');
        slider.classList.add('slider', 'round');
        readButton.append(slider);
    })
}

function generateTestData() {
    new Book('Harry Potter', 'jk rowling', '123', true);
    new Book('Cook Book', 'jk rowling', '123', false);
    new Book('Great Book ', 'jk rowling', '123', true);
    new Book('Awecome Book', 'jk rowling', '123', true);
    new Book('Another book', 'jk rowling', '123', true);
}


// Initial set up

setUpEventListeners();
modal.style.display = 'none';
generateTestData();
renderLibrary();




