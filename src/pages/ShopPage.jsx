import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './ShopPage.css';

const ShopPage = () => {
  return (
    <div className="shop-page container">
      <div className="shop-header text-center">
        <h1>All Arrangements</h1>
        <p>Explore our full collection of hand-crafted floral designs.</p>
      </div>
      
      <div className="shop-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
