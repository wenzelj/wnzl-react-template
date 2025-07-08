import { Product } from '../types/product';

const API_BASE_URL = 'https://api.example.com'; // Placeholder API URL

export class ProductRepository {
  async getAllProducts(): Promise<Product[]> {
    try {
      // In a real application, you would use fetch or a library like axios here
      // For this example, we'll simulate an API call with a delay and mock data
      console.log(`Fetching all products from ${API_BASE_URL}/products`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

      const mockProducts: Product[] = [
        { id: '1', name: 'Product A', price: 100, description: 'Description for Product A' },
        { id: '2', name: 'Product B', price: 150 },
        { id: '3', name: 'Product C', price: 200, description: 'Description for Product C' },
      ];
      return mockProducts;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw new Error('Failed to fetch products.');
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      // Simulate API call
      console.log(`Fetching product with id ${id} from ${API_BASE_URL}/products/${id}`);
      await new Promise(resolve => setTimeout(resolve, 300));

      const mockProducts: Product[] = [
        { id: '1', name: 'Product A', price: 100, description: 'Description for Product A' },
        { id: '2', name: 'Product B', price: 150 },
        { id: '3', name: 'Product C', price: 200, description: 'Description for Product C' },
      ];

      const product = mockProducts.find(p => p.id === id) || null;
      if (!product) {
        console.warn(`Product with id ${id} not found.`);
      }
      return product;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw new Error(`Failed to fetch product with id ${id}.`);
    }
  }
}

// Export an instance of the repository
export const productRepository = new ProductRepository();
