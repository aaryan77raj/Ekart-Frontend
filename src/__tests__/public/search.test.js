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

describe('Search Functionality', () => {
  test('should filter products based on search input', () => {
    renderWithProviders(<Catalog />);
    
    const searchInput = screen.getByTestId('search-input');
    
    // Initially should show all products
    expect(screen.getByText('Acme Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText('Premium Keyboard')).toBeInTheDocument();
    
    // Search for 'mouse'
    fireEvent.change(searchInput, { target: { value: 'mouse' } });
    
    // Should only show mouse product
    expect(screen.getByText('Acme Wireless Mouse')).toBeInTheDocument();
    expect(screen.queryByText('Premium Keyboard')).not.toBeInTheDocument();
    
    // Search for 'keyboard'
    fireEvent.change(searchInput, { target: { value: 'keyboard' } });
    
    // Should only show keyboard product
    expect(screen.queryByText('Acme Wireless Mouse')).not.toBeInTheDocument();
    expect(screen.getByText('Premium Keyboard')).toBeInTheDocument();
  });
});