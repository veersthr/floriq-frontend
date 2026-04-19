import { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronDown, User, Search } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { itemCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <header className="navbar">
      <div className="nav-content">
        {/* Brand */}
        <Link to="/" className="brand">
          <img src="assets/logo.png" alt="Floriq Logo" className="brand-icon" />
          <div className="brand-text">
            <span className="brand-name">Floriq</span>
            <span className="slogan">where feelings bloom</span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>

          {/* Categories Dropdown */}
          <div
            className={`nav-dropdown ${categoryOpen ? 'open' : ''}`}
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => setCategoryOpen(false)}
          >
            <button className="nav-link dropdown-trigger">
              Categories
              <ChevronDown size={14} className="chevron-icon" />
            </button>
            <div className="dropdown-menu">
              <span className="dropdown-coming-soon">✨ Coming Soon</span>
            </div>
          </div>
          
          <Link to="/about" className="nav-link">About</Link>
        </nav>

        {/* Actions (Search, Profile, Cart) */}
        <div className="nav-actions">
          {/* Search */}
          <form className={`search-form ${searchQuery.trim() ? 'has-query' : ''}`} onSubmit={handleSearch}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`search-input ${searchQuery.trim() ? 'has-text' : ''}`}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          {/* Profile Dropdown */}
          <div
            className={`nav-dropdown ${profileOpen ? 'open' : ''}`}
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <button className="icon-btn-wrapper dropdown-trigger profile-trigger" aria-label="Profile">
              <User size={22} className="action-icon" />
            </button>
            <div className="dropdown-menu profile-menu">
              {!user ? (
                <>
                  <Link to="/login" className="dropdown-item" onClick={() => setProfileOpen(false)}>Login</Link>
                  <Link to="/register" className="dropdown-item" onClick={() => setProfileOpen(false)}>Sign Up</Link>
                </>
              ) : (
                <>
                  <div className="dropdown-user-info" style={{ padding: '0.5rem 1.5rem', borderBottom: '1px solid var(--color-border)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    Hi, <strong>{user.name.split(' ')[0]}</strong>
                  </div>
                  <Link to="/profile" className="dropdown-item" onClick={() => setProfileOpen(false)}>My Profile</Link>
                  <Link to="/orders" className="dropdown-item" onClick={() => setProfileOpen(false)}>My Orders</Link>
                  {user.role === 'admin' && <button className="dropdown-item">Dashboard</button>}
                  <button className="dropdown-item" onClick={() => { logout(); setProfileOpen(false); }}>Logout</button>
                </>
              )}
            </div>
          </div>
          {/* Cart */}
          <Link to="/cart" className="icon-btn-wrapper cart-wrapper">
            <ShoppingCart size={22} className="action-icon" />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
