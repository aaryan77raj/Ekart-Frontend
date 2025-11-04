/**
 * @llm-instructions
 * - Comment all logical blocks with `// ****`
 * - Wrap all console logs in `*** ... ***`
 * - Do not modify file structure
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// **** Create Cart Context ****
const CartContext = createContext();

// **** Custom hook to use the cart context ****
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// **** Provider component ****
export const CartProvider = ({ children }) => {
  // **** Initialize cart from localStorage ****
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.log('*** Failed to load cart from storage ***');
      return [];
    }
  });

  // **** Persist cart to localStorage whenever it changes ****
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (err) {
      console.log('*** Failed to save cart to storage ***');
    }
  }, [cart]);

  // **** Add product to cart ****
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // **** Increment quantity if already in cart ****
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) }
            : item
        );
      } else {
        // **** Add new product with capped quantity ****
        const itemToAdd = {
          ...product,
          price: Number(product.price),
          quantity: Math.min(quantity, product.stock || quantity),
        };
        return [...prev, itemToAdd];
      }
    });
    console.log('*** Added to cart:', product.title, '***');
  };

  // **** Update quantity of a product ****
  const updateQuantity = (productId, quantity) => {
    setCart((prev) => {
      if (quantity <= 0) {
        console.log('*** Removing from cart:', productId, '***');
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(quantity, item.stock) }
          : item
      );
    });
  };

  // **** Remove an item entirely ****
  const removeFromCart = (productId) => {
    console.log('*** Removed product:', productId, '***');
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // **** Clear the entire cart ****
  const clearCart = () => {
    console.log('*** Cart cleared ***');
    setCart([]);
  };

  // **** Get total number of items in cart ****
  const getCartItemCount = () =>
    cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // **** Get subtotal in cents ****
  const getCartSubtotal = () =>
    cart.reduce(
      (sum, item) =>
        sum + (Number(item.price) || 0) * (item.quantity || 0),
      0
    );

  // **** Provide all functions and state ****
  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartItemCount,
    getCartSubtotal,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};
