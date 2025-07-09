import { getTodos } from '../TodoRepository';
import { fetchTodos as mockFetchTodos } from '../../services/TodoService';
import { Todo } from '../../types/todo';

// Mock the TodoService
jest.mock('../../services/TodoService');

describe('TodoRepository', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (mockFetchTodos as jest.Mock).mockClear();
  });

  it('should call fetchTodos from TodoService and return its result', async () => {
    const mockTodos: Todo[] = [
      { userId: 1, id: 1, title: 'Test Todo 1', completed: false },
      { userId: 1, id: 2, title: 'Test Todo 2', completed: true },
    ];

    (mockFetchTodos as jest.Mock).mockResolvedValueOnce(mockTodos);

    const todos = await getTodos();

    expect(mockFetchTodos).toHaveBeenCalledTimes(1);
    expect(todos).toEqual(mockTodos);
  });

  it('should propagate errors from TodoService', async () => {
    const mockError = new Error('Service Error');
    (mockFetchTodos as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(getTodos()).rejects.toThrow('Service Error');
    expect(mockFetchTodos).toHaveBeenCalledTimes(1);
  });
});
