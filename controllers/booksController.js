const Book = require('../models/book');

class BooksController {
    // Display all books
    static async index(req, res) {
        try {
            const books = await Book.getAll();
            res.render('pages/index', { 
                title: 'My Books', 
                books: books 
            });
        } catch (error) {
            console.error('Error in index:', error);
            res.status(500).render('pages/error', { 
                title: 'Error', 
                message: 'Unable to load books' 
            });
        }
    }

    // Show form to add new book
    static async showAddForm(req, res) {
        res.render('pages/add-book', { 
            title: 'Add New Book' 
        });
    }

    // Create new book
    static async createBook(req, res) {
        try {
            const bookData = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                rating: parseInt(req.body.rating),
                date_read: req.body.date_read,
                isbn: req.body.isbn
            };

            await Book.create(bookData);
            res.redirect('/');
        } catch (error) {
            console.error('Error creating book:', error);
            res.status(500).render('pages/add-book', { 
                title: 'Add New Book', 
                error: 'Unable to add book. Please try again.' 
            });
        }
    }

    // Show form to edit book
    static async showEditForm(req, res) {
        try {
            const book = await Book.getById(req.params.id);
            if (!book) {
                return res.status(404).render('pages/error', { 
                    title: 'Error', 
                    message: 'Book not found' 
                });
            }
            res.render('pages/edit-book', { 
                title: 'Edit Book', 
                book: book 
            });
        } catch (error) {
            console.error('Error showing edit form:', error);
            res.status(500).render('pages/error', { 
                title: 'Error', 
                message: 'Unable to load book for editing' 
            });
        }
    }

    // Update book
    static async updateBook(req, res) {
        try {
            const bookData = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                rating: parseInt(req.body.rating),
                date_read: req.body.date_read,
                isbn: req.body.isbn
            };

            await Book.update(req.params.id, bookData);
            res.redirect('/');
        } catch (error) {
            console.error('Error updating book:', error);
            res.status(500).render('pages/edit-book', { 
                title: 'Edit Book', 
                error: 'Unable to update book. Please try again.' 
            });
        }
    }

    // Delete book
    static async deleteBook(req, res) {
        try {
            await Book.delete(req.params.id);
            res.redirect('/');
        } catch (error) {
            console.error('Error deleting book:', error);
            res.status(500).json({ error: 'Unable to delete book' });
        }
    }
}

module.exports = BooksController; 