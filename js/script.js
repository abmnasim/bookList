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
            if(ISBN == book.isbn){
                data = true;
            }
        });
        return data;
    }

    static Notice(msg, status){
        const div = document.createElement('div');
        div.className = `alert ${status}`;
        div.appendChild(document.createTextNode(msg));

        const noticeLoc = document.querySelector('#notice');
        noticeLoc.append(div);
        setTimeout(() => {
            UI.clearAlert();
        }, 3000);
    }

    static clearAlert(){
        const currentAlert = document.querySelector(".alert");
        if(currentAlert){
            currentAlert.remove();
        }
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

// ISBN Checking Function
function isbnCheck(e) {
    let reSN = /^[a-zA-Z0-9]+$/;
    let data = e.target.value.trim();
    if(reSN.test(data)){
        isbn.classList.remove('is-invalid');
        bookISBNFB.innerHTML = '';
        bisbn = data;
    }else{
        isbn.classList.add('is-invalid');
        bookISBNFB.innerHTML = 'Please provide a valid ISBN';
    }
}

// Book Name Check Function
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

// Book Author Checking Function
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

// Book Price Checking Function
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

// Add New Book Function
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
        if(UI.checkISBN(book.isbn) === false){
            UI.AddToBookList(book);
            Store.addBook(book);
            UI.clearFields();
            UI.Notice('New book successfully added!','success');
        }else{
            UI.Notice('ISBN already have!','error');
        }
        
    }
}
