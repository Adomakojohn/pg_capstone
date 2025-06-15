const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/booksController');

// Show form to add new book
router.get('/add', BooksController.showAddForm);

// Create new book
router.post('/add', BooksController.createBook);

// Show form to edit book
router.get('/edit/:id', BooksController.showEditForm);

// Update book
router.post('/edit/:id', BooksController.updateBook);

// Delete book
router.post('/delete/:id', BooksController.deleteBook);

module.exports = router; 