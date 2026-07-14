import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Cart() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('starbucks_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('starbucks_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('starbucks_user');
    setUser(null);
  };

  useEffect(() => {
    localStorage.setItem('starbucks_cart', JSON.stringify(cart));
  }, [cart]);

  // Group products by ID to compute quantities
  const groupedCart = [];
  cart.forEach(product => {
    const existing = groupedCart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      groupedCart.push({ ...product, quantity: 1 });
    }
  });

  const handleIncrement = (product) => {
    setCart([...cart, product]);
  };

  const handleDecrement = (productId) => {
    // Remove the first occurrence of the product with the given ID
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const handleRemove = (productId) => {
    // Remove all occurrences of the product with the given ID
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    alert("Order placed successfully! Thank you for shopping with us.");
  };

  // Calculations
  const totalItemsCount = cart.length;
  
  // Calculate total original price before discount
  // Note: dummyjson returns price as discounted price, let's compute an estimated original price based on discountPercentage
  const totalOriginalPrice = groupedCart.reduce((sum, item) => {
    const discount = item.discountPercentage || 0;
    const originalItemPrice = item.price / (1 - discount / 100);
    return sum + (originalItemPrice * item.quantity);
  }, 0);

  const totalDiscountedPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const totalDiscountSavings = totalOriginalPrice - totalDiscountedPrice;

  return (
    <div className="Home-container">
      {/* Navigation */}
      <nav className="navbar">
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          🛒 E-commerce Shop
        </Link>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Hello, {user.name}</span>
              <button className="login-btn" style={{ padding: '4px 12px', minWidth: 'auto', margin: '0' }} onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="login-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>Login</Link>
          )}
          <Link to="/" className="login-btn" style={{ textDecoration: 'none', textAlign: 'center', margin: '0' }}>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Cart Container */}
      <main className="main-content">
        {groupedCart.length === 0 ? (
          <div className="no-products animate-fade-in" style={{ padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛒</div>
            <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '8px', color: '#212121' }}>
              Your Cart is Empty!
            </h2>
            <p style={{ color: '#878787', fontSize: '14px', marginBottom: '24px' }}>
              Add items to it now to explore great deals.
            </p>
            <Link to="/" className="shop-now-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="cart-layout" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
            
            {/* Left Column: Cart items */}
            <div className="cart-items-panel" style={{ flex: '1', minWidth: '300px', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600' }}>My Cart ({groupedCart.length})</h2>
                <span style={{ fontSize: '14px', color: '#878787' }}>Deliver to: <strong>Mumbai - 400001</strong></span>
              </div>

              {groupedCart.map((item) => (
                <div key={item.id} className="cart-item-row" style={{ display: 'flex', gap: '20px', padding: '24px', borderBottom: '1px solid #f0f0f0' }}>
                  
                  {/* Item Image & Stepper */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '112px' }}>
                    <div style={{ width: '112px', height: '112px', display: 'flex', alignItems: 'center', justifyItems: 'center', marginBottom: '16px' }}>
                      <img src={item.thumbnail} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', margin: 'auto' }} />
                    </div>
                    
                    {/* Stepper */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        onClick={() => handleDecrement(item.id)} 
                        disabled={item.quantity <= 1}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #c2c2c2', background: 'white', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                      >
                        -
                      </button>
                      <span style={{ width: '32px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>{item.quantity}</span>
                      <button 
                        onClick={() => handleIncrement(item)}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #c2c2c2', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#212121', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#878787' }}>Seller: SuperCom Retail</p>
                    
                    <div className="product-price-row" style={{ marginTop: '4px' }}>
                      <span className="product-price" style={{ fontSize: '20px' }}>${item.price}</span>
                      <span style={{ textDecoration: 'line-through', color: '#878787', fontSize: '14px', marginLeft: '8px' }}>
                        ${Math.round(item.price / (1 - (item.discountPercentage || 0) / 100))}
                      </span>
                      <span className="product-discount" style={{ marginLeft: '8px', fontSize: '13px' }}>
                        {item.discountPercentage}% Off
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
                      <button 
                        onClick={() => handleRemove(item.id)}
                        style={{ background: 'none', border: 'none', color: '#212121', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                        onMouseOver={(e) => e.target.style.color = '#2874f0'}
                        onMouseOut={(e) => e.target.style.color = '#212121'}
                      >
                        REMOVE
                      </button>
                      <button 
                        style={{ background: 'none', border: 'none', color: '#212121', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                        onMouseOver={(e) => e.target.style.color = '#2874f0'}
                        onMouseOut={(e) => e.target.style.color = '#212121'}
                      >
                        SAVE FOR LATER
                      </button>
                    </div>
                  </div>

                </div>
              ))}

              {/* Place Order CTA Footer */}
              <div style={{ padding: '16px 22px', display: 'flex', justifyContent: 'flex-end', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', backgroundColor: 'white', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}>
                <button 
                  onClick={clearCart}
                  style={{ backgroundColor: '#fb641b', color: 'white', border: 'none', padding: '16px 40px', fontSize: '16px', fontWeight: '600', borderRadius: '2px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#e45a17'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#fb641b'}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>

            {/* Right Column: Price Details */}
            <aside className="price-details-panel" style={{ width: '350px', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ padding: '12px 24px', borderBottom: '1px solid #f0f0f0' }}>
                <h3 style={{ fontSize: '14px', color: '#878787', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Price Details
                </h3>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px dashed #e0e0e0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Price ({totalItemsCount} items)</span>
                  <span>${Math.round(totalOriginalPrice)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Discount</span>
                  <span style={{ color: '#388e3c' }}>-${Math.round(totalDiscountSavings)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Delivery Charges</span>
                  <span style={{ color: '#388e3c' }}>FREE</span>
                </div>
              </div>

              <div style={{ padding: '24px', borderBottom: '1px dashed #e0e0e0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                  <span>Total Amount</span>
                  <span>${totalDiscountedPrice}</span>
                </div>
              </div>

              <div style={{ padding: '16px 24px' }}>
                <p style={{ color: '#388e3c', fontWeight: '600', fontSize: '14px' }}>
                  You will save ${Math.round(totalDiscountSavings)} on this order
                </p>
              </div>
            </aside>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer" style={{ marginTop: 'auto' }}>
        <div className="footer-links">
          <div>
            <h4>About Us</h4>
            <ul>
              <li>Company Info</li>
              <li>Careers</li>
              <li>Press Releases</li>
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Email: support@shopeasy.com</li>
              <li>Phone: +91 800 123 4567</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ShopEasy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Cart;
