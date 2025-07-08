import { Product } from '../types/product';
import { productRepository, ProductRepository } from '../repositories/ProductRepository';

export class ProductService {
  private repository: ProductRepository;

  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  async fetchAllProducts(): Promise<Product[]> {
    try {
      // Business logic can be added here.
      // For example, filtering, mapping, or adding computed properties.
      const products = await this.repository.getAllProducts();
      // Example: Log the number of products fetched
      console.log(`${products.length} products fetched by ProductService.`);
      return products;
    } catch (error) {
      // The error from the repository is already logged.
      // We can add additional service-specific error handling or logging here.
      console.error('ProductService: Error fetching all products.', error);
      // Re-throw the error or throw a new service-specific error
      throw new Error('Service failed to fetch products.');
    }
  }

  async fetchProductDetails(id: string): Promise<Product | null> {
    try {
      // Business logic for fetching a single product
      const product = await this.repository.getProductById(id);
      if (product) {
        // Example: Add a timestamp to the product details when fetched
        // return { ...product, fetchedAt: new Date().toISOString() };
        console.log(`Product details for ${id} fetched by ProductService.`);
      } else {
        console.log(`ProductService: Product with id ${id} not found.`);
      }
      return product;
    } catch (error) {
      console.error(`ProductService: Error fetching product details for id ${id}.`, error);
      throw new Error(`Service failed to fetch product details for id ${id}.`);
    }
  }

  // Example of a method with more business logic:
  async getProductsWithDiscount(discountPercentage: number): Promise<Product[]> {
    if (discountPercentage <= 0 || discountPercentage >= 100) {
      throw new Error('Invalid discount percentage. Must be between 0 and 100.');
    }
    const products = await this.fetchAllProducts();
    return products.map(product => ({
      ...product,
      price: product.price * (1 - discountPercentage / 100),
      description: `${product.description || ''} (Discounted by ${discountPercentage}%)`.trim(),
    }));
  }
}

// Export an instance of the service, injecting the repository instance
export const productService = new ProductService(productRepository);
