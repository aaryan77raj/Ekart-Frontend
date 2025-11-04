import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div className="thank-you-page">
      <div className="thank-you-content">
        <h1 data-testid="thank-you-message">
          Thank you for your purchase!
        </h1>
        <p>Your order has been successfully placed.</p>
        <Link to="/" className="go-home-link">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;