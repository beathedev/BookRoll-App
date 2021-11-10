const formBook = document.getElementById('form1');
const formQuote = document.getElementById('form2');
// Set today date as a default.
document.getElementById('inputDate').valueAsDate = new Date();


// Book Class: Represents a Book
class Book {
    constructor(title, author, rating, date) {
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.date = date;
    }
}

class Quote {
    constructor(title, author, quotePhrase) {
        this.title = title;
        this.author = author;
        this.quotePhrase = quotePhrase;
    }
}




class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static getQuotes() {
        let quotes;
        if (localStorage.getItem('quotes') === null) {
            quotes = [];
        } else {
            quotes = JSON.parse(localStorage.getItem('quotes'));
        }
        return quotes;
    }

    static addQuotes(quote) {
        const quotes = Store.getQuotes();
        quotes.push(quote);
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

}

class PageUI {
    static displayBooks() {
        const books = Store.getBooks();
        const CSSClass = ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'];
        books.forEach(book => {
            const listUL = document.getElementById('list-allbooks');
            const listLI = document.createElement('li');
            listLI.innerHTML = `
            <div class="col-md-10">
            <strong>${book.title} - ${book.author}. (${book.date})</strong>
            </div>
            <div class="col-sm-2">
            <span class="badge bg-primary rounded-pill">${book.rating}★</span> 
            <button type="button" class="btn badge bg-primary rounded-pill" id="fav" >♥</button>
            </div>
            `;
            for (var i = 0, length = CSSClass.length; i < length; i++) {
                listLI.classList.add(CSSClass[i]);
            }
            listUL.appendChild(listLI);
        });
    }

    static displayQuotes() {
        const quotes = Store.getQuotes();
        const CSSClass = ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'];
        quotes.forEach(quote => {
            const listULQuote = document.getElementById('list-allquotes');
            const listLIQuote = document.createElement('li');
            listLIQuote.innerHTML = ` 
            <div class="col-md-10">
            <strong>"${quote.quotePhrase}."</strong> - ${quote.title}, ${quote.author}.
            </div>
            `;
            for (var i = 0, length = CSSClass.length; i < length; i++) {
                listLIQuote.classList.add(CSSClass[i]);
            }
            listULQuote.appendChild(listLIQuote);
        });
    }


    static randomQuote() {
        // Catch all Quotes
        const quotes = Store.getQuotes();
        const blockquote = document.getElementById('blockquote');
        const figcaption = document.getElementById('figcaption');

        console.log(quotes);
        if (quotes == 0) {
            blockquote.innerHTML = `No quotes found :(`;
        } else {
            setInterval(() => {

                let random = quotes[Math.floor(Math.random() * quotes.length)];
                console.log(random);
                blockquote.innerHTML = `
                "${random.quotePhrase}."
                `;
                figcaption.innerHTML = `
                ${random.author}, <cite title="Source Title">${random.title}</cite>
                `;
            }, 2000);
        }

    }



}

formBook.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('inputTitle').value;
    const author = document.getElementById('inputAuthor').value;
    const rating = document.getElementById('inputRating').value;
    const date = document.getElementById('inputDate').value;

    // const date = document.querySelector('#inputDate').value;
    const book = new Book(title, author, rating, date);
    Store.addBook(book);
});


formQuote.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('inputTitleQuote').value;
    const author = document.getElementById('inputAuthorQuote').value;
    const inputQuote = document.getElementById('inputQuote').value;
    const quote = new Quote(title, author, inputQuote);
    Store.addQuotes(quote);
});

const init = () => {
    PageUI.displayBooks();
    PageUI.displayQuotes();
    PageUI.randomQuote();
}

init()