import React, { useEffect, useState } from 'react';
import { getTodos } from '../repositories/TodoRepository';
import { Todo } from '../types/todo';

function AboutPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error('Failed to load todos:', error);
        // Optionally, set an error state here to display to the user
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>About Page</h1>
        <p>Loading todos...</p>
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
