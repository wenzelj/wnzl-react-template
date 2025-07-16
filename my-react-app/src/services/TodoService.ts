import { Todo } from '../types/todo';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error fetching todos: ${response.statusText}`);
    }
    const data: Todo[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
