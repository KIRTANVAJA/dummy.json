import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email/mobile and password.');
      return;
    }

    let displayName = 'User';
    const emailValue = email.trim();
    if (emailValue.includes('@')) {
      const usernamePart = emailValue.split('@')[0]; 
      const firstNamePart = usernamePart.split(/[\._-]/)[0];
      displayName = firstNamePart.charAt(0).toUpperCase() + firstNamePart.slice(1);
    } else if (/^\d+$/.test(emailValue)) {
      displayName = `User_${emailValue.slice(-4)}`;
    } else {
      displayName = emailValue.charAt(0).toUpperCase() + emailValue.slice(1);
    }

    const mockUser = {
      name: displayName,
      email: emailValue,
    };
    localStorage.setItem('starbucks_user', JSON.stringify(mockUser));
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      
      <div style={{ display: 'flex', width: '850px', height: '520px', backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}>
        
        <div style={{ width: '40%', backgroundColor: '#2874f0', color: 'white', padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px' }}>Login</h1>
            <p style={{ fontSize: '15px', color: '#dbdbdb', lineHeight: '1.5' }}>
              Get access to your Orders, Wishlist, Recommendations, and a fully functional shopping cart.
            </p>
          </div>
          <div style={{ width: '100px', opacity: '0.8', alignSelf: 'center' }}>
            <span style={{ fontSize: '72px' }}>🛒</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '60%', padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#878787', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Enter Email/Mobile number
            </label>
            <input
              type="text"
              placeholder="e.g. kirtan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', border: 'none', borderBottom: '2px solid #e0e0e0', padding: '8px 0', fontSize: '16px', outline: 'none', marginTop: '4px', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.target.style.borderBottomColor = '#2874f0'}
              onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#878787', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Enter Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', border: 'none', borderBottom: '2px solid #e0e0e0', padding: '8px 0', fontSize: '16px', outline: 'none', marginTop: '4px', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.target.style.borderBottomColor = '#2874f0'}
              onBlur={(e) => e.target.style.borderBottomColor = '#e0e0e0'}
            />
          </div>

          {error && (
            <p style={{ color: '#d32f2f', fontSize: '13px', margin: 0, fontWeight: '500' }}>
              {error}
            </p>
          )}

          <p style={{ fontSize: '12px', color: '#878787', lineHeight: '1.4', margin: '8px 0' }}>
            By continuing, you agree to ShopEasy's <span style={{ color: '#2874f0', cursor: 'pointer' }}>Terms of Use</span> and <span style={{ color: '#2874f0', cursor: 'pointer' }}>Privacy Policy</span>.
          </p>

          <button
            type="submit"
            style={{ backgroundColor: '#fb641b', color: 'white', border: 'none', width: '100%', padding: '14px', fontSize: '15px', fontWeight: '600', borderRadius: '2px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e45a17'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#fb641b'}
          >
            Login
          </button>

          <div style={{ textAlign: 'center', marginTop: 'auto' }}>
            <Link to="/" style={{ color: '#2874f0', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>
              New to ShopEasy? Create an account
            </Link>
          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;
