import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  // We'll use relative path for API so it works smoothly when served from backend
  const apiUrl = '/api/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(apiUrl);
      setTasks(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks', error);
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post(apiUrl, { title });
      setTasks([...tasks, res.data]);
      setTitle('');
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <div className="container">
      <h1>Cloud DevOps Tasks</h1>
      <p className="subtitle">Manage your CI/CD tasks efficiently.</p>
      
      <form className="task-form" onSubmit={addTask}>
        <input 
          type="text" 
          placeholder="Enter a new DevOps task..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {loading ? (
          <p style={{textAlign: 'center'}}>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p style={{textAlign: 'center', color: '#64748b'}}>No tasks yet. Add one above!</p>
        ) : (
          tasks.map(task => (
            <div className="task-item" key={task._id}>
              <span>{task.title}</span>
              <span className="status-badge">Pending</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
