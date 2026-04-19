import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Add multiple quantities by firing context multiple times, or rewrite context to accept quantity
    // Let's rewrite context to accept quantity later, for now we add it iteratively (or better, let's assume CartContext will be updated or we loop)
    // Actually our addToCart in CartContext just adds +1 if it finds it, or sets quantity: 1 if it doesn't.
    // Let's modify cart context later, for now we trigger it `quantity` times.
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
  };

  if (loading) return <div className="detail-container loading">Loading...</div>;
  if (error || !product) return <div className="detail-container error"><h2>Product not found.</h2><Link to="/shop">Return to Shop</Link></div>;

  return (
    <div className="product-detail-page container">
      <div className="pd-breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
      </div>
      
      <div className="pd-grid">
        <div className="pd-image-section">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        
        <div className="pd-info-section">
          <span className="pd-category-label">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="pd-price">${product.price.toFixed(2)}</p>
          
          <div className="pd-description">
            <p>{product.description}</p>
          </div>

          <div className="pd-stock">
            {product.stock > 0 && product.isAvailable ? (
              <span className="in-stock">In Stock ({product.stock} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          {product.stock > 0 && product.isAvailable && (
            <div className="pd-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
              <button className="btn-primary pd-add-btn" onClick={handleAddToCart}>
                Add {quantity > 1 ? `${quantity} items ` : ''}to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
