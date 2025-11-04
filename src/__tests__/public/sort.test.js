import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import Catalog from '../../components/Catalog';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CartProvider>
        {component}
      </CartProvider>
    </BrowserRouter>
  );
};

describe('Sort Functionality', () => {
  test('should sort products by price ascending', () => {
    renderWithProviders(<Catalog />);
    
    const sortSelect = screen.getByTestId('sort-select');
    
    // Sort by price ascending
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });
    
    const productCards = screen.getAllByText(/\$\d+\.\d{2}/);
    const prices = productCards.map(card => 
      parseFloat(card.textContent.replace('$', ''))
    );
    
    // Check if prices are in ascending order
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  test('should sort products by price descending', () => {
    renderWithProviders(<Catalog />);
    
    const sortSelect = screen.getByTestId('sort-select');
    
    // Sort by price descending
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });
    
    const productCards = screen.getAllByText(/\$\d+\.\d{2}/);
    const prices = productCards.map(card => 
      parseFloat(card.textContent.replace('$', ''))
    );
    
    // Check if prices are in descending order
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }
  });
});