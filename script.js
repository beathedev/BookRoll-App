const formBook = document.getElementById('form1');
const formQuote = document.getElementById('form2');
var buttonNumber = 0;
// Set today date as a default.
document.getElementById('inputDate').valueAsDate = new Date();


// Book Class: Represents a Book
class Book {
    constructor(title, author, rating, date, favorite) {
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.date = date;
        this.favorite = 0;
    }
}

class Quote {
    constructor(title, author, quotePhrase) {
        this.title = title;
        this.author = author;
        this.quotePhrase = quotePhrase;
    }
}


class storeBooks {
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
        const books = storeBooks.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

}

class storeQuotes {
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
        const quotes = storeQuotes.getQuotes();
        quotes.push(quote);
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }
}


class PageUI {
    static displayBooks() {
        const books = storeBooks.getBooks();
        const CSSClass = ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'];
        books.forEach(book => {
            const listUL = document.getElementById('list-allbooks');
            const listLI = document.createElement('li');
            buttonNumber = buttonNumber + 1;
            listLI.innerHTML = `
            <div class="col-sm-10" style="font-size: 12px">
            <strong>${book.title} - ${book.author}. (${book.date})</strong>
            </div>
            <div class="col-sm-2">
            <button class="btn badge bg-primary rounded-pill"> - </button> 
            <span class="badge bg-primary rounded-pill">${book.rating}★</span>  
            <button type="button" class="btn badge bg-primary rounded-pill" id="fav${buttonNumber}" >♥</button>
            </div>`;
            for (var i = 0, length = CSSClass.length; i < length; i++) {
                listLI.classList.add(CSSClass[i]);
            }
            listUL.appendChild(listLI);
            const button = document.getElementById("fav" + buttonNumber);
            button.addEventListener('click', () => {
                var books2 = JSON.parse(localStorage.getItem('books'));
                for (var x = 0; x < books2.length; x++) {
                    if (book.title === books2[x].title) {
                        if (book.favorite === 0) {
                            books2[x].favorite = 1;
                            console.log(books2);
                            break;
                        } else {
                            books2[x].favorite = 0;
                            console.log(books2);
                            break;
                        }
                    }
                }
                localStorage.setItem("books", JSON.stringify(books2));
                document.location.reload(true);
            })
            this.displayFavorite(book, button);
        });

    }

    static displayFavorite(book, button) {

        if (book.favorite === 1) {
            button.style.color = 'red';

        }
    }



    static displayFavorites() {
        const books = storeBooks.getBooks();
        const favorites = storeFavorites.getFavorites();

        for (let index = 0; index < books.length; index++) {
            if (favorite[index].title === book[index].title) {
                console.log(favorite[index].title);
                console.log(book[index].title);
            }
        }


    }

    static displayQuotes() {
        const quotes = storeQuotes.getQuotes();
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
        const quotes = storeQuotes.getQuotes();
        const blockquote = document.getElementById('blockquote');
        const figcaption = document.getElementById('figcaption');
        if (quotes == 0) {
            blockquote.innerHTML = `No quotes found :(`;
        } else {
            setInterval(() => {

                let random = quotes[Math.floor(Math.random() * quotes.length)];
                blockquote.innerHTML = `
                "${random.quotePhrase}."
                `;
                figcaption.innerHTML = `
                ${random.author}, <cite title="Source Title">${random.title}</cite>
                `;
            }, 30000);
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
    storeBooks.addBook(book);
});


formQuote.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('inputTitleQuote').value;
    const author = document.getElementById('inputAuthorQuote').value;
    const inputQuote = document.getElementById('inputQuote').value;
    const quote = new Quote(title, author, inputQuote);
    storeQuotes.addQuotes(quote);
});



const init = () => {
    PageUI.displayBooks();
    PageUI.displayQuotes();
    PageUI.randomQuote();
}

init()