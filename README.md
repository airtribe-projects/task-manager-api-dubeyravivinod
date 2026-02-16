# Task Manager API

A RESTful API for managing tasks built with Node.js and Express. This API provides CRUD operations for task management with in-memory data storage.

## Features

- ✅ Create, Read, Update, and Delete tasks
- ✅ RESTful API design
- ✅ Unique task ID generation using UUID
- ✅ In-memory data storage
- ✅ JSON request/response format
- ✅ Input validation

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **UUID** - Unique identifier generation
- **Nodemon** - Development auto-reload

## Project Structure

```
TaskManagerAPI/
├── app.js                  # Main application entry point
├── package.json            # Project dependencies and scripts
├── controllers/
│   └── taskController.js   # Request handlers for task operations
├── models/
│   └── taskModel.js        # Data model and business logic
└── routes/
    └── taskRoutes.js       # API route definitions
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dubeyravivinod/TaskManagerAPI.git
cd TaskManagerAPI
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a specific task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task by ID |
| DELETE | `/tasks/:id` | Delete a task by ID |

## Usage Examples

### 1. Create a Task

**Request:**
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README file",
  "completed": false
}
```

**Response:**
```json
{
  "message": "Task created successfully",
  "newTask": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project documentation",
    "description": "Write comprehensive README file",
    "completed": false
  }
}
```

### 2. Get All Tasks

**Request:**
```bash
GET /api/tasks
```

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project documentation",
    "description": "Write comprehensive README file",
    "completed": false
  }
]
```

### 3. Get Task by ID

**Request:**
```bash
GET /api/tasks/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete project documentation",
  "description": "Write comprehensive README file",
  "completed": false
}
```

### 4. Update a Task

**Request:**
```bash
PUT /api/tasks/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README file",
  "completed": true
}
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "updatedTask": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project documentation",
    "description": "Write comprehensive README file",
    "completed": true
  }
}
```

### 5. Delete a Task

**Request:**
```bash
DELETE /api/tasks/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "message": "Task deleted successfully",
  "deletedTask": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project documentation",
    "description": "Write comprehensive README file",
    "completed": true
  }
}
```

## Task Object Structure

```json
{
  "id": "string (UUID)",
  "title": "string (required)",
  "description": "string (required)",
  "completed": "boolean (required)"
}
```

## Error Responses

### 404 Not Found
```json
{
  "message": "Task not found"
}
```

### 400 Bad Request
```json
{
  "message": "Missing required fields"
}
```

## Testing with cURL

### Create a task:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Task description","completed":false}'
```

### Get all tasks:
```bash
curl http://localhost:3000/api/tasks
```

### Get a specific task:
```bash
curl http://localhost:3000/api/tasks/{task-id}
```

### Update a task:
```bash
curl -X PUT http://localhost:3000/api/tasks/{task-id} \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","description":"Updated description","completed":true}'
```

### Delete a task:
```bash
curl -X DELETE http://localhost:3000/api/tasks/{task-id}
```

## Development

Start the development server with auto-reload:
```bash
npm start
```

## Notes

- This API uses in-memory storage. All data will be lost when the server restarts.
- For production use, consider implementing persistent storage (database).
- No authentication is implemented in this version.

## Author

**Dubey Ravi Vinod**

## License

ISC

## Repository

[https://github.com/dubeyravivinod/TaskManagerAPI](https://github.com/dubeyravivinod/TaskManagerAPI)

## Issues

Report issues at: [https://github.com/dubeyravivinod/TaskManagerAPI/issues](https://github.com/dubeyravivinod/TaskManagerAPI/issues)
