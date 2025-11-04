/**
 * @llm-instructions
 * - Comment all logical blocks with `// ****`
 * - Wrap all console logs in `*** ... ***`
 * - Do not modify file structure
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  // **** Get total cart item count from context ****
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <nav className="navbar">
      {/* **** App logo **** */}
      <Link to="/" className="logo">
        🛍️ E-Shop
      </Link>

      {/* **** Navigation links **** */}
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        {/* **** Cart badge for test recognition **** */}
        <Link
          to="/cart"
          className="nav-link"
          data-testid="cart-badge"
        >
          Cart ({itemCount})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
