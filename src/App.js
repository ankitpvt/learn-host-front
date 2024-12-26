import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Fetch todos from the backend
    //http://localhost:5000
    axios.get('http://localhost:5000')
      .then(response => setTodos(response.data))
      .catch(error => console.log(error));
  }, []);

  const addTodo = () => {
    if (!newTodo) return;

    // Add a new todo
    axios.post('http://localhost:5000/todos', { task: newTodo })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.log(error));

    setNewTodo('');
  };

  const deleteTodo = (id) => {
    // Delete a todo
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Add a new task" 
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;