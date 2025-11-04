/** 
 * @llm-instructions
 * - Comment all logical blocks with `// ****`
 * - Wrap all console logs in `*** ... ***`
 * - Do not modify file structure
 */
import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  // **** get cart functions ****
  const { addToCart, updateQuantity, cart } = useCart();
  const inCart = cart.find(i => i.id === product.id);

  // **** handle add ****
  const handleAdd = () => {
    addToCart(product);
    console.log(`*** Added product ${product.id} to cart ***`);
  };

  if (product.stock === 0) {
    return (
      <div className="product-card" data-testid={`product-${product.id}`}>
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${(product.price / 100).toFixed(2)}</p>
          <p className="product-stock">Stock: {product.stock}</p>
          <div className="out-of-stock">Out of Stock</div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card" data-testid={`product-${product.id}`}>
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${(product.price / 100).toFixed(2)}</p>
        <p className="product-stock">Stock: {product.stock}</p>

        {!inCart ? (
          // **** add button when not in cart ****
          <button
            className="add-to-cart-btn"
            data-testid={`add-to-cart-${product.id}`}
            onClick={handleAdd}
          >
            Add to Cart
          </button>
        ) : (
          // **** quantity controls when in cart ****
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              data-testid={`dec-catalog-${product.id}`}
              onClick={() => updateQuantity(product.id, inCart.quantity - 1)}
            >
              -
            </button>
            <span
              className="quantity"
              data-testid={`qty-catalog-${product.id}`}
            >
              {inCart.quantity}
            </span>
            <button
              className="quantity-btn"
              data-testid={`inc-catalog-${product.id}`}
              onClick={() => updateQuantity(product.id, inCart.quantity + 1)}
              disabled={inCart.quantity >= product.stock}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
