# Task Management RESTful API

A RESTful API for managing tasks built with Node.js and Express.js using in-memory data storage. This project implements full CRUD functionality, input validation, filtering, and centralized error handling.

---

## Project Overview

This API allows users to:

- Create a task
- Retrieve all tasks
- Retrieve a single task by ID
- Update a task
- Delete a task
- Filter tasks using query parameters

The application uses in-memory storage (no database) to focus on core REST API concepts and Express.js fundamentals.

---

## Tech Stack

- Node.js
- Express.js
- JavaScript (ES6+)
- Jest (for testing)
- Postman or curl (for API testing)

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <repository-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
npm start
```

The server runs on:

```
http://localhost:3000
```

---

## Running Tests

To execute all test cases:

```bash
npm run test
```

Ensure all tests are passing before submitting your project.

---

## API Endpoints

Base URL:

```
http://localhost:3000/api/tasks
```

---

### Create a Task

**POST** `/api/tasks`

Request body:

```json
{
  "title": "Complete assignment",
  "description": "Finish the REST API project",
  "completed": false
}
```

Response example:

```json
{
  "id": "1",
  "title": "Complete assignment",
  "description": "Finish the REST API project",
  "completed": false
}
```

---

### Get All Tasks

**GET** `/api/tasks`

Optional query parameters:

- `completed=true|false`
- `title=<keyword>`

Example:

```
GET /api/tasks?completed=false
```

---

### Get Task by ID

**GET** `/api/tasks/:id`

Example:

```
GET /api/tasks/1
```

---

### Update a Task

**PUT** `/api/tasks/:id`

Request body (partial updates allowed if implemented):

```json
{
  "title": "Updated title",
  "completed": true
}
```

---

### Delete a Task

**DELETE** `/api/tasks/:id`

---

## Error Handling

The API returns structured error responses.

### 400 - Bad Request
- Missing required fields
- Invalid input types

### 404 - Not Found
- Task does not exist

### 500 - Internal Server Error
- Unexpected server failure

Example error response:

```json
{
  "error": "Task not found"
}
```

---

## Input Validation

Validation rules:

- `title` is required and must be a non-empty string
- `completed` must be a boolean (if provided)
- Invalid fields are rejected
- Request body must be valid JSON

---

## Testing the API Manually

Using curl:

```bash
curl -X GET http://localhost:3000/api/tasks
```

You may also use Postman or any REST client.

---

## Submission Checklist

- API implemented with all CRUD operations
- Proper validation and error handling
- Filtering implemented
- All tests passing (`npm run test`)
- Code pushed to `main` branch
- Pull Request (#1) created to `feedback` branch

---

## License

This project is for educational purposes only.
