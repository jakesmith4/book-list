import get from './utils/getElement.js';

// Book Constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Constructor
class UI {
  constructor() {}

  // Add Book To List  UI Prototype
  addBookToList(book) {
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
  }

  // Show Alert  UI Prototype
  showAlert(message, className, title) {
    // Create Div
    const div = document.createElement('div');

    // Add Classes To New Div
    div.classList.add(className, 'alert');
    // Add Message To Div
    div.innerHTML = `<p class="paragraph">
    ${message}
    <span class="diffrent">${title}</span>
    </p>`;

    // Get Elements
    const container = get('.container');
    const form = get('#book-form');

    // Insert The New Div Before The Form
    container.insertBefore(div, form);

    // Timeout After 3 Seconds
    setTimeout(() => {
      get('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    // Delete Book UI Prototype
    if (target.classList.contains('fa-times')) {
      // Get tr Element From DOM
      const tr = target.parentElement.parentElement.parentElement;

      // Remove tr Element
      tr.remove();
    }
  }

  // Clear Fields UI Prototype
  clearFields() {
    get('#title').value = '';
    get('#author').value = '';
    get('#isbn').value = '';
  }
}

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
    ui.showAlert('Please fill in all fields', 'error', '');
  } else {
    // Add Book To List
    ui.addBookToList(book);

    // Clear Fields
    ui.clearFields();

    // Error Alert
    ui.showAlert('Book Added', 'success', title);
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
  if (e.target.classList.contains('fa-times')) {
    const title =
      e.target.parentElement.parentElement.parentElement.firstElementChild
        .textContent;

    ui.showAlert('Book Removed', 'error', title);
  }
});
