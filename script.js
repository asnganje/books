const availableBooks = document.getElementById('available-books');

const BookTitle = document.getElementById('title');

const theAuthor = document.getElementById('author');

const addNewBook = document.getElementById('submit');

if (!localStorage.getItem('dataForBook')) {
  localStorage.setItem('dataForBook', JSON.stringify([]));
}

let ourBooks;

function addToLocalStore(ourBooks) {
  localStorage.setItem('dataForBook', JSON.stringify(ourBooks));
}


function showBooksContent() {
  ourBooks = JSON.parse(localStorage.getItem('dataForBook'));

  displayInnerHtmlContent();
}

showBooksContent();

addNewBook.addEventListener('click', (event1) => {
  event1.preventDefault();

  if (BookTitle.value && theAuthor.value) {
    const sampleBook = { title: BookTitle.value, author: theAuthor.value };

    ourBooks.push(sampleBook);

    addToLocalStore(ourBooks);

    showBooksContent();

    BookTitle.value = '';

    theAuthor.value = '';
  }
});

function displayInnerHtmlContent() {
  availableBooks.innerHTML = '';

  ourBooks.forEach((data, index) => {
    const ourNewBook = document.createElement('div');

    const bookName = document.createElement('p');

    bookName.textContent = `${data.title} `;

    const bookAuthor = document.createElement('p');

    bookAuthor.textContent = `${data.author}`;

    const btnRemoveBk = document.createElement('button');

    btnRemoveBk.textContent = 'Remove';

    btnRemoveBk.addEventListener('click', deleteBook.bind(index));
    
    const hrline = document.createElement('hr');

    ourNewBook.appendChild(bookName);

    ourNewBook.appendChild(bookAuthor);

    ourNewBook.appendChild(btnRemoveBk);

    ourNewBook.appendChild(hrline);

    availableBooks.appendChild(ourNewBook);
  });
}

function deleteBook() {
  ourBooks.splice(this, 1);

  addToLocalStore(ourBooks);

  showBooksContent();
}