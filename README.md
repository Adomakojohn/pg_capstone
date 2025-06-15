# 📚 Books Tracker

A simple web application to track books you've read, built with Node.js, Express, EJS, and PostgreSQL.

## Features

-  Add and manage your reading collection
-  Rate books from 1-5 stars
-  Automatic book cover fetching using APIs
-  Track when you read each book
-  Add descriptions and personal notes
-  Mobile-friendly interface

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: EJS templating, HTML5, CSS3
- **APIs**:  Open Library API (for book covers)
- **HTTP Client**: Axios

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd pg_capstone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   - Create a database named `books_tracker`
   - Run the schema file to create tables:
     ```bash
     psql -d books_tracker -f sql/schema.sql
     ```

4. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add your database configuration:
     ```env
     DB_USER=your_username
     DB_HOST=localhost
     DB_NAME=books_tracker
     DB_PASSWORD=your_password
     DB_PORT=5432
     PORT=3000
     ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`

## Project Structure

```
pg_capstone/
├── config/             # Database configuration
├── controllers/        # Business logic
├── models/            # Database models
├── public/            # Static assets (CSS, JS, images)
├── routes/            # Express routes
├── views/             # EJS templates
│   ├── partials/      # Reusable template parts
│   └── pages/         # Main page templates
├── sql/               # Database schema
├── app.js             # Main application file
└── package.json       # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

## How to Use

1. **Add a Book**: Click "Add Book" and fill in the details
2. **Auto Cover Detection**: Enter an ISBN for automatic cover fetching
3. **Rate Books**: Give each book a 1-5 star rating
4. **View Collection**: See all your books in a beautiful grid layout
5. **Edit/Delete**: Manage your collection with edit and delete options

## API Integration

The app automatically fetches book covers using:
- **Google Books API** (primary)
- **Open Library API** (fallback)
- **Placeholder images** (if no cover found)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions, please check the documentation or create an issue in the repository. 