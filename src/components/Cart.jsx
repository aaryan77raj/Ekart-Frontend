/** 
 * @llm-instructions
 * - Comment all logical blocks with `// ****`
 * - Wrap all console logs in `*** ... ***`
 * - Do not modify file structure
 */
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // **** get cart and functions ****
  const { cart, updateQuantity, removeFromCart, clearCart, getCartSubtotal } = useCart();
  const navigate = useNavigate();

  // **** subtotal and cart state ****
  const subtotalCents = getCartSubtotal();
  const hasItems = cart.length > 0;

  // **** buy now handler ****
  const handleBuyNow = () => {
    console.log('*** Purchase complete, cart cleared ***');
    clearCart();
    navigate('/thank-you');
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {/* **** Empty cart message **** */}
      {!hasItems && <p data-testid="empty-cart">Your cart is empty</p>}

      {/* **** Cart items and subtotal when items exist **** */}
      {hasItems && (
        <>
          <ul className="cart-items">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-title">{item.title}</span>
                  <span className="cart-item-price">
                    ${((Number(item.price) || 0) / 100).toFixed(2)}
                  </span>
                </div>

                <div className="cart-item-controls">
                  <button
                    data-testid={`dec-cart-${item.id}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    data-testid={`inc-cart-${item.id}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                  <button
                    className="remove-btn"
                    data-testid={`remove-${item.id}`}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p data-testid="cart-subtotal">
              Subtotal: ${(subtotalCents / 100).toFixed(2)}
            </p>
          </div>
        </>
      )}

      {/* **** Buy Now button should always exist for tests **** */}
      <button
        className="buy-now-btn"
        data-testid="buy-now"
        onClick={handleBuyNow}
        disabled={!hasItems}
      >
        Buy Now
      </button>
    </div>
  );
};

export default Cart;
