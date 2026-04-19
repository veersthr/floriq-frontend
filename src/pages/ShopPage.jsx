import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './ShopPage.css';

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  // Filter Pipeline
  let displayedProducts = [...products];

  if (searchQuery) {
    displayedProducts = displayedProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (categoryFilter !== 'all') {
    displayedProducts = displayedProducts.filter(p => p.category === categoryFilter);
  }

  if (priceFilter !== 'all') {
    displayedProducts = displayedProducts.filter(p => {
      if (priceFilter === 'under50') return p.price < 50;
      if (priceFilter === '50to100') return p.price >= 50 && p.price <= 100;
      if (priceFilter === 'over100') return p.price > 100;
      return true;
    });
  }

  // Sorting
  if (sortOption === 'lowToHigh') {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'highToLow') {
    displayedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'newest') {
    // Assuming _id generation carries timestamp, or createdAt exists
    displayedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  return (
    <div className="shop-page container">
      <div className="shop-header text-center">
        <h1>All Arrangements</h1>
        <p>Explore our full collection of hand-crafted floral designs.</p>
        
        {/* Filters Top Bar */}
        <div className="shop-filters">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="roses">Roses</option>
            <option value="bouquets">Bouquets</option>
            <option value="seasonal">Seasonal</option>
            <option value="gifts">Gifts</option>
          </select>

          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="all">Any Price</option>
            <option value="under50">Under $50</option>
            <option value="50to100">$50 - $100</option>
            <option value="over100">Over $100</option>
          </select>

          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="newest">Newest Arrivals</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
      
      <div className="shop-grid">
        {displayedProducts.length > 0 ? (
          displayedProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0' }}>
            <p>No arrangements found matching "{searchQuery}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
