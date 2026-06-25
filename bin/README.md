# Task Manager Application# Task Manager Application

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

A simple and secure Task Manager web application built with Node.js, Express, Jade (Pug), SQLite, and Express Sessions.

Users can register, log in, manage their own tasks, and securely log out. Each user only has access to their own tasks, ensuring proper data isolation and authentication.

## Features

### Authentication
- User Registration
- User Login
- Password Hashing using bcrypt
- Session-based Authentication
- User Logout
- Protected Routes

### Task Management
- Create Tasks
- View Tasks
- Edit Tasks
- Delete Tasks
- User-specific Tasks (Multi-user Isolation)

### Security
- Passwords stored as hashes
- Protected routes using authentication middleware
- Users can only access their own tasks
- Session management with Express Session

## Technologies Used

- Node.js
- Express.js
- Jade (Pug)
- SQLite (better-sqlite3)
- bcrypt
- express-session
- CSS

## Project Structure

```text
project/
│
├── app.js
├── database/
|   └── createTaskTable.js
|   └── creatusertable.js
|   └── db.js
|   └── tasks.db
│
├── middleware/
│   ├── auth.js
│   └── validateTask.js
│
├── routes/
│   ├── auth.js
│   └── tasks.js
│
├── views/
│   ├── layout.jade
│   ├── login.jade
│   ├── register.jade
│   ├── tasks.jade
│   ├── new-task.jade
│   ├── edit-task.jade
│   └── task.jade
│
├── public/
│   └── stylesheets/
│       └── style.css
│
└── package.json
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Samuel265-Coder/Task-manager
```

### 2. Navigate into the project

```bash
cd task-manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm start
```

### 5. Open in browser

```text
http://localhost:3001
```

## Database

The application uses SQLite through better-sqlite3.

The database is automatically initialized with:

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT NOT NULL
);
```

### Tasks Table

```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  user_id INTEGER NOT NULL
);
```

## How Authentication Works

1. User registers an account.
2. Password is hashed using bcrypt.
3. User logs in.
4. A session is created.
5. Protected routes require authentication.
6. User can only access tasks associated with their account.
7. User can log out to destroy the session.

## Future Improvements

Contributions are welcome. Some ideas for future enhancements include:

- Task completion status
- Task priorities
- Due dates
- Categories and tags
- Search and filtering
- User profiles
- Dark mode
- Responsive mobile design
- REST API
- Docker support
- Unit and integration tests
- Email verification
- Password reset functionality
- Notifications and reminders

## Contributing

Contributions are highly encouraged.

To contribute:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

Please ensure your code follows the existing project structure and coding style.

## Open Source Goal

This project was created as a learning and collaboration platform for developers interested in:

- Node.js
- Express.js
- Authentication
- SQLite
- Session Management
- MVC Architecture

Developers are encouraged to improve the application and submit pull requests with new features, bug fixes, and performance improvements.

## License

This project is licensed under the MIT License.

## Author

Samuel Gondwe - Octo Visuals

GitHub: https://github.com/Samuel265-Coder/Task-manager

---

If you find this project useful, please consider giving it a star.