import React from 'react';
import { useTodos } from '../hooks/useTodos';

function AboutPage() {
  const { todos, loading, error } = useTodos();

  if (loading) {
    return (
      <div>
        <h1>About Page</h1>
        <p>Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>About Page</h1>
        <p style={{ color: 'red' }}>Error loading todos: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>About Page</h1>
      <h2>Todos:</h2>
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AboutPage;
