import React, { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('floriq-cart');
    if (!savedCart) return [];
    try {
      const items = JSON.parse(savedCart);
      // Normalize items: ensure every item has an _id (fallback to id if missing)
      return items.map(item => ({
        ...item,
        _id: item._id || item.id
      }));
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('floriq-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item._id === product._id);
      if (existingItem) {
        return prev.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item._id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      subtotal,
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};
