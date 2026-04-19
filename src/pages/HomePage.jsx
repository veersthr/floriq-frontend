import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './HomePage.css';
import './HomePage.css';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?auto=format&fit=crop&w=1600&q=80',
    heading: 'Elegance in Every Bloom',
    subtext: 'Discover our curated collection of beautiful, fresh flowers delivered right to your door.',
    accent: 'rgba(255,105,180,0.18)',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?auto=format&fit=crop&w=1600&q=80',
    heading: 'Fresh from the Garden',
    subtext: 'Hand-picked, sustainably sourced blooms that bring the garden straight into your home.',
    accent: 'rgba(164,180,148,0.22)',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1621628521890-ebbf656c6a32?auto=format&fit=crop&w=1600&q=80',
    heading: 'Celebrate Every Moment',
    subtext: 'From birthdays to anniversaries — let our bouquets speak the words you feel.',
    accent: 'rgba(255,200,100,0.18)',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1653262343155-dc4e12bd36fd?auto=format&fit=crop&w=1600&q=80',
    heading: 'Gift Someone Special',
    subtext: 'A thoughtful bouquet says more than words. Make someone smile today.',
    accent: 'rgba(255,130,160,0.18)',
  },
];

const INTERVAL = 4000;

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from: http://localhost:5001/api/products');
        const response = await fetch('http://localhost:5001/api/products');
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Received data:', data);
        // Just take the first 3 for trending
        if (data.length > 0) {
          setFeaturedProducts(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching trending products:', error);
      }
    };
    fetchProducts();

    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="home-page">
      {/* ── Hero Carousel ── */}
      <section className="hero-carousel">
        {/* Slide backgrounds */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`carousel-bg ${i === current ? 'active' : ''}`}
            style={{ backgroundImage: `url('${s.image}')` }}
          />
        ))}


        {/* Content */}
        <div className={`carousel-content ${animating ? 'fade-out' : 'fade-in'}`}>
          <h1>{slide.heading}</h1>
          <p>{slide.subtext}</p>
          <Link to="/shop" className="btn-primary hero-btn">Shop Collection</Link>
        </div>


      </section>

      {/* ── Shop Collection ── */}
      <section className="featured container">
        <div className="section-header text-center">
          <h2>Trending Now</h2>
          <p>Our most loved arrangements this season.</p>
        </div>
        <div className="featured-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="text-center view-all">
          <Link to="/shop" className="btn-secondary">View All</Link>
        </div>
      </section>

      {/* ── About ── */}
      <section className="about-section">
        <div className="container about-content">
          <div className="about-text">
            <h2>Crafted with Love</h2>
            <p>Every Floriq bouquet is carefully hand-tied by our expert florists using only the freshest, sustainably sourced blooms. We believe that flowers have the power to transform any moment into a special memory.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
