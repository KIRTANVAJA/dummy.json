import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('starbucks_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState('');

  // Local Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
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

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  },[]);
  

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const allCategories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats);
  }, [products]);

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(2000);
    setMinRating(0);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());
      
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);
      
    const matchesPrice = product.price <= maxPrice;
    const matchesRating = product.rating >= minRating;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const categories = {};
  filteredProducts.forEach(product => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  return (
    <div className="Home-container">
      <nav className="navbar">
        <div className="nav-logo">E-commerce</div>
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search for products,  categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="nav-actions">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Hello, {user.name}</span>
              <button className="login-btn" style={{ padding: '4px 12px', minWidth: 'auto', margin: '0' }} onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="login-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>Login</Link>
          )}
          <Link to="/cart" className="cart-icon" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>🛒</span>
            <span className="cart-badge">{cart.length}</span>
          </Link>
        </div>
      </nav>

      <div className="hero-banner">
        <div className="hero-content">
          <h1>Mega Electronics & Fashion Sale</h1>
          <p>Get up to 50% off on top brands and categories</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>

      <main className="main-content" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {!loading && !error && (
          <aside className="sidebar-filters" style={{ width: '280px', backgroundColor: 'white', borderRadius: '4px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flexShrink: '0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Filters</h3>
              <button 
                onClick={handleClearFilters}
                style={{ background: 'none', border: 'none', color: '#2874f0', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
              >
                CLEAR ALL
              </button>
            </div>

            <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#212121', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price</h4>
              <input 
                type="range" 
                min="0" 
                max="2000" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))} 
                style={{ width: '100%', accentColor: '#2874f0', cursor: 'pointer' }} 
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#878787', marginTop: '6px' }}>
                <span>Min: $0</span>
                <span>Max: ${maxPrice}</span>
              </div>
            </div>

            <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#212121', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Rating</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[4, 3, 2].map((stars) => (
                  <label key={stars} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="ratingFilter" 
                      checked={minRating === stars} 
                      onChange={() => setMinRating(stars)}
                      style={{ accentColor: '#2874f0' }} 
                    />
                    <span>{stars}★ & above</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#212121', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categories</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto', paddingRight: '4px' }}>
                {allCategories.map(cat => (
                  <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(cat)} 
                      onChange={() => handleCategoryToggle(cat)}
                      style={{ accentColor: '#2874f0' }} 
                    />
                    <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>
        )}

        <div style={{ flex: '1', minWidth: '300px' }}>
          {loading && <div className="loading-spinner">Loading products...</div>}
          {error && <div className="error-message">{error}</div>}

          {!loading && !error && Object.keys(categories).length === 0 && (
            <div className="no-products">No products found matching your filters.</div>
          )}

          {!loading && !error && Object.keys(categories).map(categoryName => (
            <section key={categoryName} className="category-section" style={{ marginBottom: '24px' }}>
              <h2 className="category-title">{categoryName.toUpperCase()}</h2>
              <div className="products-grid">
                {categories[categoryName].map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-container">
                      <img src={product.thumbnail} alt={product.title} className="product-image" />
                    </div>
                    <div className="product-info">
                      <h3 className="product-title">{product.title}</h3>
                      <p className="product-rating">{product.rating} / 5</p>
                      <div className="product-price-row">
                        <span className="product-price">${product.price}</span>
                        <span className="product-discount">({product.discountPercentage}% OFF)</span>
                      </div>
                      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="footer">
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

export default Home;