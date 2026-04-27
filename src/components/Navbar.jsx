import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, ChevronDown, User, Search, Gift, Heart, PartyPopper, Activity, Meh, Cloud, Calendar, Users, Flower, Menu, X } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile main menu
  const [categoryOpen, setCategoryOpen] = useState(false); // Desktop Megamenu
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setCategoryOpen(false);
    setProfileOpen(false);
    setActiveMobileSection(null);
    setIsSearchExpanded(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isSearchExpanded) {
      setIsSearchExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchExpanded(false);
      setIsMenuOpen(false);
    } else {
      setIsSearchExpanded(false);
    }
  };

  const handleSearchBlur = () => {
    if (searchQuery.trim() === '') {
      setIsSearchExpanded(false);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName.toLowerCase())}`);
    setCategoryOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${categoryOpen ? 'megamenu-active' : ''}`}>
      <div className="nav-container">
        {/* Brand */}
        <Link to="/" className="brand-logo">
          <img src="assets/logo.png" alt="Floriq" className="logo-img" />
          <div className="brand-info">
            <span className="brand-title">Floriq</span>
            <span className="brand-tagline">where feelings bloom</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/" className="nav-item">Home</Link>
          
          <div 
            className="nav-item dropdown-parent"
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => setCategoryOpen(false)}
          >
            <span className="nav-link-text">
              Categories <ChevronDown size={14} className={`chevron ${categoryOpen ? 'rotated' : ''}`} />
            </span>
          </div>

          <Link to="/about" className="nav-item">About</Link>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
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

          <div 
            className="nav-action-item profile-dropdown"
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <User size={22} />
            <div className={`action-menu ${profileOpen ? 'show' : ''}`}>
              {!user ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Sign Up</Link>
                </>
              ) : (
                <>
                  <div className="user-greeting">Hi, {user.name.split(' ')[0]}</div>
                  <Link to="/profile">My Profile</Link>
                  <Link to="/orders">My Orders</Link>
                  <button onClick={logout} className="logout-btn">Logout</button>
                </>
              )}
            </div>
          </div>

          <Link to="/cart" className="nav-action-item cart-icon">
            <ShoppingCart size={22} />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>

          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Megamenu Overlay */}
      <div 
        className={`megamenu-panel ${categoryOpen ? 'visible' : ''}`}
        onMouseEnter={() => setCategoryOpen(true)}
        onMouseLeave={() => setCategoryOpen(false)}
      >
        <div className="megamenu-container">
          {categoriesData.map((section) => (
            <div key={section.id} className="megamenu-col">
              <h3 className="megamenu-heading">{section.icon} {section.title}</h3>
              <ul className="megamenu-links">
                {section.items.map((item) => (
                  <li key={item.name} onClick={() => handleCategoryClick(item.name)}>
                    {item.icon} {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`mobile-nav-panel ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <Link to="/" className="mobile-nav-link">Home</Link>
          
          <div className="mobile-accordion">
            <button 
              className="mobile-nav-link accordion-trigger"
              onClick={() => setActiveMobileSection(activeMobileSection === 'cats' ? null : 'cats')}
            >
              Categories <ChevronDown size={18} className={activeMobileSection === 'cats' ? 'rotated' : ''} />
            </button>
            <div className={`accordion-content ${activeMobileSection === 'cats' ? 'show' : ''}`}>
              {categoriesData.map(section => (
                <div key={section.id} className="mobile-sub-section">
                  <h4>{section.title}</h4>
                  {section.items.map(item => (
                    <button key={item.name} onClick={() => handleCategoryClick(item.name)}>
                      {item.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <Link to="/about" className="mobile-nav-link">About</Link>
          
          {!user ? (
            <Link to="/login" className="mobile-nav-link highlight">Login / Register</Link>
          ) : (
            <>
              <Link to="/profile" className="mobile-nav-link">My Profile</Link>
              <Link to="/orders" className="mobile-nav-link">My Orders</Link>
              <button onClick={logout} className="mobile-nav-link logout-btn">Logout</button>
            </>
          )}
        </div>
      </div>
      
      {/* Backdrop for desktop megamenu */}
      <div className={`menu-backdrop ${categoryOpen ? 'active' : ''}`} />
    </header>
  );
};

export default Navbar;
