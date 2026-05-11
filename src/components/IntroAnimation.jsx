import React, { useEffect, useState, useRef } from 'react';

export default function IntroAnimation({ onComplete, navbarBrandRef }) {
  const [phase, setPhase] = useState('idle'); // 'idle' -> 'revealing' -> 'flying' -> 'fadingOut' -> 'done'
  
  const animatingBrandRef = useRef(null);
  const animatingTaglineRef = useRef(null);

  const [brandFlyStyle, setBrandFlyStyle] = useState({});
  const [taglineFlyStyle, setTaglineFlyStyle] = useState({});

  useEffect(() => {
    // Phase 1: Revealing (starts immediately)
    const t1 = setTimeout(() => setPhase('revealing'), 10);

    // Phase 2: Flying (at 3s)
    const t2 = setTimeout(() => {
      if (navbarBrandRef?.current && animatingBrandRef.current && animatingTaglineRef.current) {
        const navBrandRect = navbarBrandRef.current.getBoundingClientRect();
        const currentBrandRect = animatingBrandRef.current.getBoundingClientRect();
        const currentTaglineRect = animatingTaglineRef.current.getBoundingClientRect();

        // 1. Set to fixed at current position instantly
        setBrandFlyStyle({
          position: 'fixed',
          top: `${currentBrandRect.top}px`,
          left: `${currentBrandRect.left}px`,
          margin: 0,
          animation: 'none',
          opacity: 1,
          transform: 'translate(0, 0) scale(1)',
          transformOrigin: 'top left',
        });

        setTaglineFlyStyle({
          position: 'fixed',
          top: `${currentTaglineRect.top}px`,
          left: `${currentTaglineRect.left}px`,
          margin: 0,
          animation: 'none',
          opacity: 1,
          transform: 'translate(0, 0) scale(1)',
          transformOrigin: 'top left',
        });

        // 2. Next frame: apply translation to fly to the target
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const brandX = navBrandRect.left - currentBrandRect.left;
            const brandY = navBrandRect.top - currentBrandRect.top;

            // Approximate tagline target position just below the navbar brand
            const taglineTargetX = navBrandRect.left;
            const taglineTargetY = navBrandRect.bottom;

            const taglineX = taglineTargetX - currentTaglineRect.left;
            const taglineY = taglineTargetY - currentTaglineRect.top;

            setBrandFlyStyle(prev => ({
              ...prev,
              transform: `translate(${brandX}px, ${brandY}px) scale(${18 / 64})`,
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }));

            setTaglineFlyStyle(prev => ({
              ...prev,
              transform: `translate(${taglineX}px, ${taglineY}px) scale(${10 / 12})`,
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }));
          });
        });
      }
      setPhase('flying');
    }, 3000);

    // Phase 3: Background fades out (at 3.8s)
    const t3 = setTimeout(() => setPhase('fadingOut'), 3800);

    // Phase 4: Complete (at 4s)
    const t4 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 4000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [navbarBrandRef, onComplete]);

  if (phase === 'done') return null;

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400&display=swap');

          .intro-animation-container {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background-color: #020101ff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            transition: background-color 0.2s ease, opacity 0.2s ease;
          }

          .intro-animation-container.fading-out {
            background-color: transparent;
            opacity: 0;
            pointer-events: none;
          }

          .intro-brand-name {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            font-size: 64px;
            color: #fff;
            opacity: 0;
            transform: translateY(20px);
            margin: 0;
          }
          
          .intro-brand-name.revealing {
            animation: introFadeUp 0.8s ease-out 0.3s forwards;
          }

          .intro-divider {
            height: 1px;
            background-color: rgba(255, 255, 255, 0.4);
            width: 0px;
            margin: 20px 0 15px 0;
            transition: opacity 0.2s ease;
          }

          .intro-divider.revealing {
            animation: introExpandLine 0.6s ease-out 1s forwards;
          }
          
          .intro-divider.flying {
            opacity: 0;
          }

          .intro-tagline {
            font-family: 'DM Sans', sans-serif;
            font-weight: 300;
            font-size: 12px;
            letter-spacing: 5px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.7);
            opacity: 0;
            margin: 0;
            margin-right: -5px;
            white-space: nowrap;
          }

          .intro-tagline.revealing {
            animation: introFadeIn 0.8s ease-out 1.2s forwards;
          }

          @keyframes introFadeUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes introExpandLine {
            0% { width: 0px; }
            100% { width: 60px; }
          }

          @keyframes introFadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <div className={'intro-animation-container' + (phase === 'fadingOut' ? ' fading-out' : '')}>
        <h1
          className={'intro-brand-name' + (phase === 'revealing' ? ' revealing' : '')}
          ref={animatingBrandRef}
          style={phase === 'flying' || phase === 'fadingOut' ? brandFlyStyle : {}}
        >
          Floriq
        </h1>
        <div className={'intro-divider' + (phase !== 'idle' ? ' revealing' : '') + (phase === 'flying' || phase === 'fadingOut' ? ' flying' : '')}></div>
        <p
          className={'intro-tagline' + (phase === 'revealing' ? ' revealing' : '')}
          ref={animatingTaglineRef}
          style={phase === 'flying' || phase === 'fadingOut' ? taglineFlyStyle : {}}
        >
          where feelings bloom
        </p>
      </div>
    </>
  );
}
