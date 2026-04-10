import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ChevronDown } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { itemCount } = useContext(CartContext);
  const [categoryOpen, setCategoryOpen] = useState(false);

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
        </nav>

        {/* Cart */}
        <div className="nav-actions">
          <Link to="/cart" className="cart-icon-wrapper">
            <ShoppingCart size={22} className="cart-icon" />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
