import { Flower, Heart, Sparkles, Leaf } from 'lucide-react';
import TriptychSection from '../components/TriptychSection';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* 🌸 Top Image Section */}
      <div className="about-top-image">
        <img src="/assets/about-hero.jpg" alt="About Floriq" />
      </div>

      {/* 🌸 Triptych Scroll-Reveal Story Section */}
      <TriptychSection />

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