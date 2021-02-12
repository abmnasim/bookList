const isbn = document.querySelector("#isbn");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor")
const bookPrice = document.querySelector("#bookPrice");
const bookAdd = document.querySelector("#addNewBook");
const bookList = document.querySelector("#bookList")

const bookISBNFB = document.querySelector("#isbnFeedback");
const bookTitleFB = document.querySelector("#bookTitleFeedback");
const bookAuthorFB = document.querySelector("#bookAuthorFeedback");
const bookPriceFB = document.querySelector("#bookPriceFeedback");

// Book class
class Book {
    constructor(isbn, title, author, price){
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.price = price;
    }
}


// UI class
class UI {
    static AddToBookList(book){
        
        let list = document.querySelector('#bookList');
        const div = document.createElement('tr');
        div.innerHTML = `
            <td>${book.isbn}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.price}</td>
            <td><a href="#" class="delete" title="Delete">X</a></td>
        `;
        list.appendChild(div);      
    }

    static checkISBN(ISBN){
        let books = Store.getBook();
        let data = false;
        books.forEach(book => {
            console.log(ISBN == book.isbn);
            if(ISBN == book.isbn){
                data = true;
            }
        });
        return data;
    }

    static clearFields(){
        isbn.value = bookTitle.value = bookAuthor.value = bookPrice.value = bisbn = bname = bwriter = bprice = '';
    }
}


// Store Class
class Store {
    constructor(){}

    static getBook(){
        let books;

        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        let books = Store.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static displayBookList(){
        let books = Store.getBook();
        books.forEach(book => {
            UI.AddToBookList(book);
        });
    }
}


// Event Listner List
isbn.addEventListener('keyup', isbnCheck);
bookTitle.addEventListener('keyup', nameCheck);
bookAuthor.addEventListener('keyup', writerCheck);
bookPrice.addEventListener('keyup', priceCheck);
bookAdd.addEventListener('click', addNewBook);
document.addEventListener('DOMContentLoaded', Store.displayBookList());

var bisbn = bname = bwriter = bprice = '';
let reName = /^[a-zA-Z ]+$/;

function isbnCheck(e) {
    let reSN = /^[a-zA-Z0-9]+$/;
    let data = e.target.value.trim();
    if(reSN.test(data)){
        isbn.classList.remove('is-invalid');
        bookISBNFB.innerHTML = '';
        if(data.length > 3){
            bisbn = data;
        }else{
            isbn.classList.add('is-invalid');
            bookISBNFB.innerHTML = 'Please provide a valid ISBN';
        }
    }else{
        isbn.classList.add('is-invalid');
        bookISBNFB.innerHTML = 'Please provide a valid ISBN';
    }
}

function nameCheck(e){
    let data = e.target.value.trim();
    if(reName.test(data)){
        bookTitle.classList.remove('is-invalid');
        bookTitleFB.innerHTML = '';
        if(data.length > 3){
            bname = data;
        }else{
            bookTitle.classList.add('is-invalid');
            bookTitleFB.innerHTML = 'Please provide a full name';
        }
    }else{
        bookTitle.classList.add('is-invalid');
        bookTitleFB.innerHTML = 'Please provide a valid name';
    }
}

function writerCheck(e){
    let data = e.target.value.trim();
    if(reName.test(data)){
        bookAuthor.classList.remove('is-invalid');
        bookAuthorFB.innerHTML = '';
        if(data.length > 3){
            bwriter = data;
        }else{
            bookAuthor.classList.add('is-invalid');
            bookAuthorFB.innerHTML = 'Please provide a full name';
        }
    }else{
        bookAuthor.classList.add('is-invalid');
        bookAuthorFB.innerHTML = 'Please provide a valid name';
    }
}

function priceCheck(e){
    if(e.target.value.trim() != ''){
        bookPrice.classList.remove('is-invalid');
        bookPriceFB.innerHTML = '';
        bprice = e.target.value.trim();
    }else{
        bookPrice.classList.add('is-invalid');
        bookPriceFB.innerHTML = 'Please provide a valid price';
    }
}

function addNewBook(e){
    e.preventDefault();
    if(bisbn == ''){
        isbn.classList.add('is-invalid');
        bookISBNFB.innerHTML = 'Please enter ISBN';
        isbn.focus();
    }else if(bname == ''){
        bookTitle.classList.add('is-invalid');
        bookTitleFB.innerHTML = 'Please enter a book name';
        bookTitle.focus();
    }else if(bwriter == ''){
        bookAuthor.classList.add('is-invalid');
        bookAuthorFB.innerHTML = 'Please enter book writer name';
        bookAuthor.focus();
    }else if(bprice == ''){
        bookPrice.classList.add('is-invalid');
        bookPriceFB.innerHTML = 'Please enter book price';
        bookPrice.focus();
    }else{
        let book = new Book(bisbn, bname, bwriter, bprice);
        console.log(UI.checkISBN(book.isbn));
        if(UI.checkISBN(book.isbn) === false){
            UI.AddToBookList(book);
            Store.addBook(book);
            UI.clearFields();
        }
        
    }
}
