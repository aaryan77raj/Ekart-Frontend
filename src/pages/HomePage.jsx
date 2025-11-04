import React from 'react';
import Catalog from '../components/Catalog';
import Cart from '../components/Cart';

const HomePage = () => {
  return (
    <div className="main-content">
      <div className="catalog-section">
        <Catalog />
      </div>
      <div className="cart-section">
        <Cart />
      </div>
    </div>
  );
};

export default HomePage;