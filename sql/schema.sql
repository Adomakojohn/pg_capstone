-- Create books table
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    cover_url TEXT,
    description TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    date_read DATE,
    isbn VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);

-- Sample data (optional)
INSERT INTO books (title, author, cover_url, description, rating, date_read, isbn) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg', 'A classic American novel set in the Jazz Age', 5, '2024-01-15', '9780743273565'),
('To Kill a Mockingbird', 'Harper Lee', 'https://covers.openlibrary.org/b/isbn/9780061120084-M.jpg', 'A novel about racial injustice and childhood in the American South', 4, '2024-01-20', '9780061120084')
ON CONFLICT DO NOTHING; 