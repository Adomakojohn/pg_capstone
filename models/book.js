const pool = require('../config/database');
const axios = require('axios');

class Book {
    // Get all books
    static async getAll() {
        try {
            const result = await pool.query('SELECT * FROM books ORDER BY date_read DESC');
            return result.rows;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }

    // Get a single book by ID
    static async getById(id) {
        try {
            const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching book:', error);
            throw error;
        }
    }

    // Create a new book
    static async create(bookData) {
        try {
            const { title, author, description, rating, date_read, isbn } = bookData;
            
            // Fetch book cover using ISBN or title
            const cover_url = await this.fetchBookCover(isbn || title);
            
            const result = await pool.query(
                'INSERT INTO books (title, author, cover_url, description, rating, date_read, isbn) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [title, author, cover_url, description, rating, date_read, isbn]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error creating book:', error);
            throw error;
        }
    }

    // Update a book
    static async update(id, bookData) {
        try {
            const { title, author, description, rating, date_read, isbn } = bookData;
            const result = await pool.query(
                'UPDATE books SET title = $1, author = $2, description = $3, rating = $4, date_read = $5, isbn = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
                [title, author, description, rating, date_read, isbn, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error updating book:', error);
            throw error;
        }
    }

    // Delete a book
    static async delete(id) {
        try {
            const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting book:', error);
            throw error;
        }
    }

    // Fetch book cover using Google Books API or Open Library
    static async fetchBookCover(identifier) {
        try {
            // Try Google Books API first
            const googleResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(identifier)}`);
            
            if (googleResponse.data.items && googleResponse.data.items.length > 0) {
                const book = googleResponse.data.items[0];
                if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
                    return book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:');
                }
            }

            // Fallback to Open Library
            if (identifier.length === 10 || identifier.length === 13) {
                // It's likely an ISBN
                return `https://covers.openlibrary.org/b/isbn/${identifier}-M.jpg`;
            }

            // Default placeholder image
            return 'https://via.placeholder.com/128x192.png?text=No+Cover';
        } catch (error) {
            console.error('Error fetching book cover:', error);
            return 'https://via.placeholder.com/128x192.png?text=No+Cover';
        }
    }
}

module.exports = Book; 