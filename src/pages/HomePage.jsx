import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const slides = [
  {
    id: 1,
    image: '/assets/carousel-1.jpg',
    tagline: 'New Collection',
    heading: 'Elegance Redefined',
    subtext: 'Discover our premium, hand-picked collection that brings out your best.',
    cta: 'EXPLORE NOW',
  },
  {
    id: 2,
    image: '/assets/carousel-2.jpg',
    tagline: 'Exclusive Quality',
    heading: 'Crafted For You',
    subtext: 'Sustainably sourced and thoughtfully designed for the modern aesthetic.',
    cta: 'Explore Now',
  },
  {
    id: 3,
    image: '/assets/carousel-3.jpg',
    tagline: 'Timeless Beauty',
    heading: 'Celebrate Every Moment',
    subtext: 'Let our timeless pieces speak the words you feel. Shop the new arrivals.',
    cta: 'EXPLORE NOW',
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
        console.log(`Fetching products from: ${import.meta.env.VITE_API_BASE_URL}/api/products`);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
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
      handleNext();
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const handleNext = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % slides.length);
      setAnimating(false);
    }, 400);
  }, []);

  const handlePrev = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(prev => (prev - 1 + slides.length) % slides.length);
      setAnimating(false);
    }, 400);
  };

  const goToSlide = (index) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  };

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
          <span className="tagline">{slide.tagline}</span>
          <h1>{slide.heading}</h1>
          <p>{slide.subtext}</p>
          <Link to="/shop" className="btn-primary hero-btn">{slide.cta}</Link>
        </div>

        {/* Navigation Contols */}
        <div className="carousel-arrow left" onClick={handlePrev}>
          <ChevronLeft size={24} />
        </div>
        <div className="carousel-arrow right" onClick={handleNext}>
          <ChevronRight size={24} />
        </div>

        {/* Desktop indicator dots */}
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`carousel-dot ${i === current ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>


      </section>

      {/* ── EXPLORE NOW ── */}
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
