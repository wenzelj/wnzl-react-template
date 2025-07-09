import { fetchTodos } from '../services/TodoService';
import { Todo } from '../types/todo';

export const getTodos = async (): Promise<Todo[]> => {
  // For now, we are just passing the data through.
  // In the future, we could add caching or data transformation logic here.
  return fetchTodos();
};
