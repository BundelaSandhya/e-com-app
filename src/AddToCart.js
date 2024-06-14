import React, { useState, useEffect } from 'react';
import './Cart.css'; // Ensure you have a CSS file for styling

export function Cart({ cartItems }) {
  return (
    <div className="cart-container">
      <button className="cart-button">Cart ({cartItems.length})</button>
      <div className="cart-dropdown">
        <h2>Cart Items</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.title}</h3>
              <p>{item.quantity} x ${item.price}</p>
            </div>
          ))
        )}
        <button className="cart-button">Checkout</button>
      </div>
    </div>
  );
}

export function useCart(userId) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items for the user
    fetch(`https://dummyjson.com/carts/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.carts[0]?.products || []);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, [userId]);

  const addToCart = (product) => {
    // API call to add product to cart
    fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        products: [
          {
            id: product.id,
            quantity: 1,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update local cart state
        setCartItems((prevItems) => {
          const existingItem = prevItems.find((item) => item.id === product.id);
          if (existingItem) {
            return prevItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevItems, { ...product, quantity: 1 }];
          }
        });
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };

  return [cartItems, addToCart];
}
