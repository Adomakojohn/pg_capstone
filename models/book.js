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

    // Updated method for Open Library API
    static async fetchBookCover(identifier) {
        try {
            // Method 1: If we have an ISBN, use Open Library directly
            if (identifier && (identifier.length === 10 || identifier.length === 13)) {
                const openLibraryUrl = `https://covers.openlibrary.org/b/isbn/${identifier}-L.jpg`;
                return openLibraryUrl;
            }

            // Method 2: Search by title using Open Library Search API
            if (identifier) {
                const searchResponse = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(identifier)}&limit=1`);
                
                if (searchResponse.data.docs && searchResponse.data.docs.length > 0) {
                    const book = searchResponse.data.docs[0];
                    
                    // Try to get ISBN from the search result
                    if (book.isbn && book.isbn.length > 0) {
                        return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`;
                    }
                    
                    // Try to get cover using Open Library ID
                    if (book.cover_i) {
                        return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
                    }
                }
            }

            // Default placeholder if no cover found
            return 'https://via.placeholder.com/200x300.png?text=No+Cover+Available';
        } catch (error) {
            console.error('Error fetching book cover:', error);
            return 'https://via.placeholder.com/200x300.png?text=No+Cover+Available';
        }
    }
}

module.exports = Book; 