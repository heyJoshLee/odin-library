



class NewBookForm {
    modal = document.querySelector('#modal');
    form = document.querySelector('form');
    inputs = document.querySelectorAll('input');
    modalCloseButton = document.querySelector('#modal-close-button');
    toggleButton = document.querySelector('#read');
    launchModalButton = document.querySelector('#launch-modal-button');


    values = { 
        title: '',
        author: '',
        pages: '',
        read: false
    }

    constructor(library) {
        this.setUpEventListeners();
        modal.style.display = 'none';
        this.toggleModal = this.toggleModal.bind(this);
        this.library = library;
    }


     setUpEventListeners () {
        this.modalCloseButton.addEventListener('click', () => {
            this.toggleModal();
        })
        
        this.toggleButton.addEventListener('click', () => {
            this.values.read = !this.values.read;
        })
        
        this.launchModalButton.addEventListener('click', () => {
            this.toggleModal();
        })
        
        this.inputs.forEach(input => {
            input.addEventListener('focusout', function () {
                if (!input.checkValidity()) {
                    input.classList.add('invalid-input');
                } else {
                    input.classList.remove('invalid-input');
                }
            });
        })
        
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.values.title = document.querySelector('#title').value;
            this.values.author = document.querySelector('#author').value;
            this.values.pages = document.querySelector('#pages').value;
            const bookToAdd = new Book(this.values.title, this.values.author, this.values.pages, this.values.read);
            this.library.addBook(bookToAdd);
            this.toggleModal();
            this.clear();

            this.library.render();
        })
        
    }

    clear() {
        this.values.title = document.querySelector('#title').value = "";
        this.values.author = document.querySelector('#author').value = "";
        this.values.pages = document.querySelector('#pages').value = "";
        this.values.read = document.querySelector('#read').checked = false;
    }

    toggleModal () {
        if (modal.style.display === 'none') {
            modal.style.display = 'flex';
        } else {
            modal.style.display = 'none';
        }
    }
}


class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }

    toggleRead() {
        this.read = !this.read;
    }
}



class Library {

    booksContainer = document.querySelector('#books-container');
    form = document.querySelector('form');
    booksCreated = 0;
    books = []

    generateTestData() {
        this.addBook(new Book('Harry Potter', 'jk rowling', '123', true, ++this.booksCreated));
        this.addBook(new Book('Cook Book', 'jk rowling', '123', false, ++this.booksCreated));
        this.addBook(new Book('Great Book ', 'jk rowling', '123', true, ++this.booksCreated));
        this.addBook(new Book('Awecome Book', 'jk rowling', '123', true, ++this.booksCreated));
        this.addBook(new Book('Another book', 'jk rowling', '123', true, ++this.booksCreated));
    }

    render() {
        this.booksContainer.textContent = "";
        this.books.forEach(book => {
    
            let newBookElement = document.createElement('div')
            newBookElement.classList.add('book');
            if (book.read) {
                newBookElement.classList.add('read');
            }
            
            newBookElement.setAttribute('data-id', book.id);
    
            let trashCan = document.createElement('img');
            trashCan.src = './icons/trash.png';
            trashCan.classList.add('trash');
    
            trashCan.addEventListener('click', () => {
                this.books = this.books.filter(bookToMap => {
                    if (bookToMap.id !== book.id) {
                        return bookToMap;
                    }
                })
                this.render();
            })
    
            newBookElement.append(trashCan);
    
            this.booksContainer.append(newBookElement);
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

     addBook(bookToAdd) {
        this.books.push(bookToAdd);
    }
    
}

const library = new Library();
const form = new NewBookForm(library);
library.generateTestData();
library.render();

console.log(form.library)
