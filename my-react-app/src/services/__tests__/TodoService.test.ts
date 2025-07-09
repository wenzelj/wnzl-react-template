import { fetchTodos } from '../TodoService';
import { Todo } from '../../types/todo';

// Mocking the global fetch function
global.fetch = jest.fn();

describe('TodoService', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (global.fetch as jest.Mock).mockClear();
  });

  it('should fetch todos successfully', async () => {
    const mockTodos: Todo[] = [
      { userId: 1, id: 1, title: 'Test Todo 1', completed: false },
      { userId: 1, id: 2, title: 'Test Todo 2', completed: true },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    });

    const todos = await fetchTodos();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos');
    expect(todos).toEqual(mockTodos);
  });

  it('should throw an error if the network response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'API Error',
    });

    await expect(fetchTodos()).rejects.toThrow('Error fetching todos: API Error');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if fetch fails', async () => {
    const mockError = new Error('Network failure');
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(fetchTodos()).rejects.toThrow('Network failure');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
