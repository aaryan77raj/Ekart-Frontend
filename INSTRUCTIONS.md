# Quick Start Guide

## Setup (5 minutes)
```bash
npm install
npm run dev
```

## Your Task
Implement shopping cart functionality. The UI is done - add the logic!

## Main File to Work On
📂 `src/context/CartContext.jsx` - Implement cart state management

## Key Functions to Implement
- `addToCart(productId, quantity)`
- `updateQuantity(productId, quantity)` 
- `removeFromCart(productId)`
- `clearCart()`
- `getCartItemCount()`
- `getCartSubtotal()`

## Wire Up Components
1. `ProductCard.jsx` - Connect add/increment/decrement buttons
2. `Cart.jsx` - Show cart items, totals, remove buttons
3. `Catalog.jsx` - Add search and sort logic
4. `Navbar.jsx` - Display cart count

## Test Your Work
```bash
npm test
```

Need all 5 test suites to pass! ✅

## Rules
- ❌ Don't change `data-testid` attributes
- ❌ Don't modify product data or CSS
- ✅ Use React Context for state
- ✅ Make all tests pass

**Time: 1 day | Focus: Context API + Component Integration**