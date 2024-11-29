let books = [];

function addBook(event) {
  event.preventDefault();

  const titleInput = document.getElementById('bookFormTitle');
  const authorInput = document.getElementById('bookFormAuthor');
  const yearInput = document.getElementById('bookFormYear');
  const isCompleteInput = document.getElementById('bookFormIsComplete');

  const bookObject = {
    id: +new Date(),
    title: titleInput.value,
    author: authorInput.value,
    year: parseInt(yearInput.value),
    isComplete: isCompleteInput.checked,
  };

  books.push(bookObject);
  document.dispatchEvent(new Event('bookChanged'));
}

function searchBook(event) {
  event.preventDefault();

  const searchInput = document.getElementById('searchBookTitle');
  const query = searchInput.value.toLowerCase();

  const filteredBooks = query
    ? books.filter((book) => book.title.toLowerCase().includes(query))
    : books;
  renderBooks(filteredBooks);
}

function toggleBookComplete(event) {
  const bookId = Number(event.target.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex].isComplete = !books[bookIndex].isComplete;
    document.dispatchEvent(new Event('bookChanged'));
  }
}

function deleteBook(event) {
  const bookId = Number(event.target.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    document.dispatchEvent(new Event('bookChanged'));
  }
}

function renderBooks(bookList) {
  const incompleteBookshelf = document.getElementById('incompleteBookList');
  const completeBookshelf = document.getElementById('completeBookList');

  incompleteBookshelf.innerHTML = '';
  completeBookshelf.innerHTML = '';

  bookList.forEach((book) => {
    const bookElement = document.createElement('article');
    bookElement.classList.add('bookItem');
    bookElement.setAttribute('data-bookid', 'bookItem');
    bookElement.setAttribute('data-bookid', book.id);

    const titleElement = document.createElement('h2');
    titleElement.innerHTML = book.title;
    titleElement.setAttribute('data-testid', 'bookItemTitle');

    const authorElement = document.createElement('p');
    authorElement.innerText = 'Penulis: ' + book.author;
    authorElement.setAttribute('data-testid', 'bookItemAuthor');

    const yearElement = document.createElement('p');
    yearElement.innerText = 'Tahun: ' + book.year;
    yearElement.setAttribute('data-testid', 'bookItemYear');

    bookElement.appendChild(titleElement);
    bookElement.appendChild(authorElement);
    bookElement.appendChild(yearElement);

    const actionDiv = document.createElement('div');
    actionDiv.classList.add('action');

    const toggleButton = document.createElement('button');
    toggleButton.id = book.id;
    toggleButton.classList.add('black');
    toggleButton.innerText = book.isComplete
      ? 'Belum Selesai dibaca'
      : 'Selesai dibaca';
    toggleButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    toggleButton.addEventListener('click', toggleBookComplete);

    const deleteButton = document.createElement('button');
    deleteButton.id = book.id;
    deleteButton.classList.add('black');
    deleteButton.innerText = 'Hapus buku';
    deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteButton.addEventListener('click', deleteBook);

    actionDiv.appendChild(toggleButton);
    actionDiv.appendChild(deleteButton);

    bookElement.appendChild(actionDiv);

    if (book.isComplete) {
      completeBookshelf.appendChild(bookElement);
    } else {
      incompleteBookshelf.appendChild(bookElement);
    }
  });
}

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
  renderBooks(books);
}
window.addEventListener('load', () => {
  books = JSON.parse(localStorage.getItem('books')) || [];
  renderBooks(books);

  document.getElementById('bookForm').addEventListener('submit', addBook);
  document.getElementById('searchBook').addEventListener('submit', searchBook);
  document.addEventListener('bookChanged', saveBooks);
});
