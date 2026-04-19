import { Flower, Heart, Sparkles, Leaf } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* 🌸 Elegant Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <span className="hero-subtitle">Our Journey</span>
          <h1>Crafting Emotions Through Nature</h1>
          <p>Where every petal tells a story and every bouquet inspired a memory.</p>
        </div>
      </section>

      {/* 🌸 Our Story - Split Section */}
      <section className="story-section container">
        <div className="story-image">
          <img 
            src="https://images.unsplash.com/photo-1519219013753-2947702f7411?auto=format&fit=crop&q=80&w=800" 
            alt="Florist at work" 
            className="premium-image" 
          />
        </div>
        <div className="story-text">
          <h2 className="section-title">The Floriq Philosophy</h2>
          <p>Founded in a small garden workshop, Floriq was born from a simple belief: that flowers are the world's most eloquent language. We don't just sell bouquets; we curate moments of connection.</p>
          <p>Our expert florists hand-select every bloom, ensuring that from the morning dew to your doorstep, the essence of freshness remains untouched.</p>
          <div className="story-stats">
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Bouquets Delivered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Artisan Partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🌸 Philosophy Cards */}
      <section className="philosophy-section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">Why Floriq?</h2>
            <p className="section-subtitle">The pillars of our floral excellence.</p>
          </div>
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <Flower className="card-icon" />
              <h3>Freshness First</h3>
              <p>We source directly from sustainable farms, bypassing wholesalers to ensure your flowers last longer and smell sweeter.</p>
            </div>
            <div className="philosophy-card">
              <Sparkles className="card-icon" />
              <h3>Artisan Design</h3>
              <p>Every arrangement is a unique piece of art, hand-tied by florists who understand color theory and floral architecture.</p>
            </div>
            <div className="philosophy-card">
              <Heart className="card-icon" />
              <h3>Emotional Impact</h3>
              <p>We believe in the power of giving. Our packaging and presentation are designed to create a "wow" moment every single time.</p>
            </div>
            <div className="philosophy-card">
              <Leaf className="card-icon" />
              <h3>Eco-Conscious</h3>
              <p>From biodegradable wrapping to carbon-neutral delivery options, we care for the earth as much as we care for its blooms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🌸 Testimonial Quote */}
      <section className="quote-section">
        <div className="container text-center">
          <blockquote className="premium-quote">
            "Flowers are the music of the ground. From earth's lips spoken without sound."
          </blockquote>
          <cite>— Edwin Curran</cite>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;