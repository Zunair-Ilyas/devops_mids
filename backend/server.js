const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://Zunair:Zunair@task-manager.hendyep.mongodb.net/?appName=Task-Manager';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected to Task-Manager'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a simple Task Schema
const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});
const Task = mongoose.model('Task', TaskSchema);

// API Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task({ title: req.body.title, completed: false });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve the React frontend (when built)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
