import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CartProvider>
        {component}
      </CartProvider>
    </BrowserRouter>
  );
};

describe('Out of Stock Functionality', () => {
  test('should show out of stock message for products with zero stock', () => {
    const outOfStockProduct = {
      id: 'p3',
      title: 'Gaming Headset',
      price: 899.0,
      stock: 0,
      image: '/images/headset.jpg',
      category: 'audio'
    };
    
    renderWithProviders(<ProductCard product={outOfStockProduct} />);
    
    // Should show out of stock message
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    
    // Add to cart button should not be present
    expect(screen.queryByTestId('add-to-cart-p3')).not.toBeInTheDocument();
  });

  test('should not show out of stock message for products with stock', () => {
    const inStockProduct = {
      id: 'p1',
      title: 'Acme Wireless Mouse',
      price: 799.0,
      stock: 5,
      image: '/images/mouse.jpg',
      category: 'accessories'
    };
    
    renderWithProviders(<ProductCard product={inStockProduct} />);
    
    // Should not show out of stock message
    expect(screen.queryByText('Out of Stock')).not.toBeInTheDocument();
    
    // Add to cart button should be present
    expect(screen.getByTestId('add-to-cart-p1')).toBeInTheDocument();
  });
});