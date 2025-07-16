import React from 'react';
import { useProducts } from '../hooks/useProducts';

function HomePage() {
  const { products, loading, error } = useProducts();

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
        <p style={{ color: 'red' }}>Error loading products: {error.message}</p>
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
