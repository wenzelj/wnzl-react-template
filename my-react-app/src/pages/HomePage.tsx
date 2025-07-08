import React, { useEffect, useState } from 'react';
import { productService } from '../services/ProductService';
import { Product } from '../types/product';

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await productService.fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Home Page</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Home Page</h1>
        <p style={{ color: 'red' }}>Error loading products: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Home Page</h1>

      <h2>Our Products</h2>
      {products.length === 0 ? (
        <p>No products available at the moment.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price.toFixed(2)}</p>
              {product.description && <p>{product.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
