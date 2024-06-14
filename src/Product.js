import React, { useEffect, useState } from 'react';
import './Product.css'; // Ensure you have a CSS file for styling
import { useCart, Cart } from './AddToCart'; // Import Cart and useCart from AddToCart

// Define the Product component correctly
export function Product({ title, image, brand, price, onAddToCart }) {
  return (
    <div className="card">
      <p><b>${price}</b></p>
      <img src={image} alt={title} />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{brand}</p>
        <button onClick={onAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export function App_list() {
  const [products, setProducts] = useState([]);
  const userId = 1; // Assuming a static user ID for simplicity
  const [cartItems, addToCart] = useCart(userId); // Use the custom hook for cart management

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h1>All Products Here</h1>
      <div className="container">
        <div className="product-list">
          {products.map((product) => (
            <Product
              key={product.id}
              title={product.title}
              image={product.thumbnail}
              brand={product.brand}
              price={product.price}
              onAddToCart={() => addToCart(product)} // Pass addToCart function as a prop
            />
          ))}
        </div>
      </div>
      <Cart cartItems={cartItems} /> {/* Include Cart component to display cart items */}
      <footer>
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
