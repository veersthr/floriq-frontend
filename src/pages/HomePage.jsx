import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
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
    image: 'https://images.unsplash.com/photo-1487530811015-780ca5a94c2a?auto=format&fit=crop&w=1600&q=80',
    heading: 'Fresh from the Garden',
    subtext: 'Hand-picked, sustainably sourced blooms that bring the garden straight into your home.',
    accent: 'rgba(164,180,148,0.22)',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1561181286-d3f5c0d0b671?auto=format&fit=crop&w=1600&q=80',
    heading: 'Celebrate Every Moment',
    subtext: 'From birthdays to anniversaries — let our bouquets speak the words you feel.',
    accent: 'rgba(255,200,100,0.18)',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc78?auto=format&fit=crop&w=1600&q=80',
    heading: 'Gift Someone Special',
    subtext: 'A thoughtful bouquet says more than words. Make someone smile today.',
    accent: 'rgba(255,130,160,0.18)',
  },
];

const INTERVAL = 4000;

const HomePage = () => {
  const featuredProducts = products.slice(0, 3);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
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

        {/* Overlay */}
        <div className="carousel-overlay" />

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center view-all">
          <Link to="/shop" className="btn-secondary">View All Flowers</Link>
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
