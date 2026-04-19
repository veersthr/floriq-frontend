import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/shop/${product._id}`}>
          <img src={product.imageUrl} alt={product.name} className="product-image" loading="lazy" />
        </Link>
        <div className="product-overlay">
          <button className="btn-primary" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
      <Link to={`/shop/${product._id}`} className="product-info" style={{ textDecoration: 'none', color: 'inherit' }}>
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
