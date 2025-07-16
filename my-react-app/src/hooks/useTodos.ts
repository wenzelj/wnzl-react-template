import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { fetchTodos } from '../services/TodoService';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  return { todos, loading, error };
};
