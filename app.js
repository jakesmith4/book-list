import get from './utils/getElement.js';

// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book To List  UI Prototype
UI.prototype.addBookToList = function (book) {
  // Get Book List
  const list = get('#book-list');
  // Create tr Element
  const row = document.createElement('tr');
  // Insert Cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td>
  <a href="#" class="delete">
  <i class="fas fa-times"></i>
  </a>
  </td>
  `;
  // Append row to list
  list.appendChild(row);
};

// Show Alert  UI Prototype
UI.prototype.showAlert = function (message, className) {
  // Create Div
  const div = document.createElement('div');

  // Add Classes To New Div
  div.classList.add(className, 'alert');
  // Add Message To Div
  div.innerHTML = `<p class="paragraph">${message}</p>`;

  // Get Elements
  const container = get('.container');
  const form = get('#book-form');

  // Insert The New Div Before The Form
  container.insertBefore(div, form);

  // Timeout After 3 Seconds
  setTimeout(() => {
    get('.alert').remove();
  }, 3000);
};

// Delete Book UI Prototype
UI.prototype.deleteBook = function (target) {
  if (target.classList.contains('fa-times')) {
    // Get tr Element From DOM
    const tr = target.parentElement.parentElement.parentElement;

    // Remove tr Element
    tr.remove();
  }
};

// Clear Fields UI Prototype
UI.prototype.clearFields = function () {
  // title.value = '';
  // author.value = '';
  // isbn.value = '';
  get('#title').value = '';
  get('#author').value = '';
  get('#isbn').value = '';
};

// Event Listeners For Form
const form = get('#book-form');
form.addEventListener('submit', (e) => {
  // Prevent Default Behavior
  e.preventDefault();

  // Get Form Values
  const title = get('#title').value;
  const author = get('#author').value;
  const isbn = get('#isbn').value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error Alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add Book To List
    ui.addBookToList(book);

    // Clear Fields
    ui.clearFields();

    // Error Alert
    ui.showAlert('Book Added', 'success');
  }
});

// Event Listener For Delete
const list = get('#book-list');
list.addEventListener('click', (e) => {
  // Prevent Default
  e.preventDefault();

  // Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Show Alert
  ui.showAlert('Book Removed', 'error');
});
