import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

describe('Buy Now Functionality', () => {
  test('should navigate to thank you page and clear cart after buying', () => {
    render(<App />);

    // Add item
    fireEvent.click(screen.getByTestId('add-to-cart-p1'));
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('Cart (1)');

    // Go to cart
    fireEvent.click(screen.getByTestId('cart-badge'));

    // Buy now
    const buyNowButton = screen.getByTestId('buy-now');
    expect(buyNowButton).not.toBeDisabled();
    fireEvent.click(buyNowButton);

    // Should be on thank you page
    expect(screen.getByTestId('thank-you-message')).toBeInTheDocument();
    expect(screen.getByText('Thank you for your purchase!')).toBeInTheDocument();

    // Cart should be cleared
    fireEvent.click(screen.getByText('Go Home'));
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('Cart (0)');
  });

  test('should disable buy now button when cart is empty', () => {
    render(<App />);

    // Go to cart
    fireEvent.click(screen.getByTestId('cart-badge'));

    const buyNowButton = screen.getByTestId('buy-now');
    expect(buyNowButton).toBeDisabled();
  });
});