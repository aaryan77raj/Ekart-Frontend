import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

const renderApp = () => render(<App />);

describe('Add to Cart Functionality', () => {
  test('should add item to cart and update cart badge', () => {
    renderApp();

    const cartBadge = screen.getByTestId('cart-badge');
    expect(cartBadge).toHaveTextContent('Cart (0)');

    const addToCartButton = screen.getByTestId('add-to-cart-p1');
    fireEvent.click(addToCartButton);

    expect(cartBadge).toHaveTextContent('Cart (1)');

    const addToCartButton2 = screen.getByTestId('add-to-cart-p2');
    fireEvent.click(addToCartButton2);

    expect(cartBadge).toHaveTextContent('Cart (2)');
  });

  test('should show quantity controls after adding to cart', () => {
    renderApp();

    // Button should exist initially
    const addToCartButton = screen.getByTestId('add-to-cart-p1');
    fireEvent.click(addToCartButton);

    // Quantity controls appear
    expect(screen.getByTestId('inc-catalog-p1')).toBeInTheDocument();
    expect(screen.getByTestId('dec-catalog-p1')).toBeInTheDocument();
    expect(screen.getByTestId('qty-catalog-p1')).toHaveTextContent('1');

    // Add button disappears
    expect(screen.queryByTestId('add-to-cart-p1')).not.toBeInTheDocument();
  });
});