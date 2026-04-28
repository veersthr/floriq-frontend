import { useEffect, useRef, useState } from 'react';
import './TriptychSection.css';

/* ── Animated counter hook ─────────────────────────────────── */
function useCountUp(target, duration = 2000) {
  const [value, setValue] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return { value, start: () => setActive(true) };
}

/* ── Component ─────────────────────────────────────────────── */
const TriptychSection = () => {
  const textRef    = useRef(null);
  const statsRef   = useRef(null);
  const photosRef  = useRef(null);

  const bouquets = useCountUp(10000, 2200);
  const partners = useCountUp(50, 1600);

  /* Scroll observers */
  useEffect(() => {
    const ease = { threshold: 0.18, rootMargin: '0px 0px -60px 0px' };

    /* Text block */
    const textObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('trq-revealed'); });
    }, ease);

    /* Stats counters */
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          bouquets.start();
          partners.start();
          statsObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });

    /* Photo triptych */
    const photoObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('trq-photos-revealed');
          photoObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    if (textRef.current)   textObs.observe(textRef.current);
    if (statsRef.current)  statsObs.observe(statsRef.current);
    if (photosRef.current) photoObs.observe(photosRef.current);

    return () => { textObs.disconnect(); statsObs.disconnect(); photoObs.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Subtle parallax on inner images */
  useEffect(() => {
    const onScroll = () => {
      if (!photosRef.current) return;
      const rect = photosRef.current.getBoundingClientRect();
      const offsetRatio = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.05;
      const imgs = photosRef.current.querySelectorAll('.trq-piece img');
      imgs.forEach((img, i) => {
        const dir = i === 1 ? -1 : 1;
        img.style.transform = `translateY(${offsetRatio * dir}px) scale(1.12)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="trq-section">

      {/* ── Brand Text ─────────────────────────────────────── */}
      <div className="trq-text" ref={textRef}>
        <span className="trq-eyebrow">Our Story</span>
        <h2 className="trq-heading">The Floriq Philosophy</h2>

        <p className="trq-para trq-s1">
          Founded in a small garden workshop, Floriq was born from a simple belief:
          that flowers are the world's most eloquent language. We don't just sell
          bouquets; we curate moments of connection.
        </p>
        <p className="trq-para trq-s2">
          Our expert florists hand-select every bloom, ensuring that from the morning
          dew to your doorstep, the essence of freshness remains untouched.
        </p>

        {/* ── Stats ── */}
        <div className="trq-stats trq-s3" ref={statsRef}>
          <div className="trq-stat">
            <span className="trq-stat-num">{bouquets.value.toLocaleString()}+</span>
            <span className="trq-stat-lbl">Bouquets Delivered</span>
          </div>
          <div className="trq-stat-sep" />
          <div className="trq-stat">
            <span className="trq-stat-num">{partners.value}+</span>
            <span className="trq-stat-lbl">Artisan Partners</span>
          </div>
        </div>
      </div>

      {/* ── Triptych Photos ────────────────────────────────── */}
      <div className="trq-photos" ref={photosRef}>
        {/* Piece 1 — slides from left */}
        <div className="trq-piece trq-piece-left">
          <img src="/assets/one.jpeg" alt="Floriq – flowers in bloom, piece 1" />
          <div className="trq-sheen" />
        </div>

        {/* Piece 2 — rises from bottom */}
        <div className="trq-piece trq-piece-center">
          <img src="/assets/two.jpeg" alt="Floriq – flowers in bloom, piece 2" />
          <div className="trq-sheen" />
        </div>

        {/* Piece 3 — slides from right */}
        <div className="trq-piece trq-piece-right">
          <img src="/assets/three.jpeg" alt="Floriq – flowers in bloom, piece 3" />
          <div className="trq-sheen" />
        </div>
      </div>

    </section>
  );
};

export default TriptychSection;
