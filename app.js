const express = require('express');

// Import routes
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

// API routes
app.use('/api', taskRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server on port ${PORT}:`, err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
}); 