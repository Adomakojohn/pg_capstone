const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/booksController');

// Home page - display all books
router.get('/', BooksController.index);

module.exports = router; 