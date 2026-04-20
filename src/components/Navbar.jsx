import { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronDown, User, Search, Gift, Heart, PartyPopper, Activity, Meh, Cloud, Calendar, Users, Flower } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const categoriesData = [
  {
    id: 'occasions',
    title: 'Occasions',
    icon: <Flower size={18} />,
    items: [
      { name: 'Birthday', icon: <Gift size={14} /> },
      { name: 'Anniversary', icon: <Heart size={14} /> },
      { name: 'Love & Romance', icon: <Heart size={14} /> },
      { name: 'Congratulations', icon: <PartyPopper size={14} /> },
      { name: 'Get Well Soon', icon: <Activity size={14} /> },
      { name: 'Sorry / Apology', icon: <Meh size={14} /> },
      { name: 'Sympathy & Condolence', icon: <Cloud size={14} /> },
    ]
  },
  {
    id: 'special-days',
    title: 'Special Days',
    icon: <Calendar size={18} />,
    items: [
      { name: "Valentine's Day", icon: <Heart size={14} /> },
      { name: "Mother's Day", icon: <Users size={14} /> },
      { name: "Father's Day", icon: <User size={14} /> },
      { name: 'Friendship Day', icon: <Users size={14} /> },
    ]
  },
  {
    id: 'relations',
    title: 'Relations',
    icon: <Users size={18} />,
    items: [
      { name: 'For Him', icon: <User size={14} /> },
      { name: 'For Her', icon: <User size={14} /> },
    ]
  }
];

const Navbar = () => {
  const { itemCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const toggleMobileSection = (sectionId, e) => {
    e.stopPropagation();
    setActiveMobileSection(activeMobileSection === sectionId ? null : sectionId);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName.toLowerCase())}`);
    setCategoryOpen(false);
    setActiveMobileSection(null);
  };

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
            onMouseLeave={() => {
              setCategoryOpen(false);
              setActiveMobileSection(null);
            }}
          >
            <button className="nav-link dropdown-trigger">
              Categories
              <ChevronDown size={14} className="chevron-icon" />
            </button>
            <div className="dropdown-menu megamenu">
              <div className="megamenu-content">
                {categoriesData.map((section) => (
                  <div key={section.id} className={`megamenu-section ${activeMobileSection === section.id ? 'active' : ''}`}>
                    <h3 onClick={(e) => toggleMobileSection(section.id, e)} className="megamenu-title">
                      {section.icon}
                      {section.title}
                      <ChevronDown size={14} className="mobile-chevron" />
                    </h3>
                    <ul className="megamenu-list">
                      {section.items.map((item) => (
                        <li 
                          key={item.name} 
                          className="megamenu-item"
                          onClick={() => handleCategoryClick(item.name)}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
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
