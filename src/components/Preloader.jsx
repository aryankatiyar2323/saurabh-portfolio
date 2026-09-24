import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Slower loading to enjoy the 3D effect
    const duration = 3000;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500); 
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { duration: 1.2, ease: "easeInOut" } 
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#030303',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        overflow: 'hidden',
        perspective: '1000px'
      }}
    >
      {/* 3D Isometric Grid Floor */}
      <div className="preloader-grid"></div>

      {/* 3D Rotating Cube */}
      <div className="cube-wrapper">
        <div className="cube">
          <div className="cube-face front"></div>
          <div className="cube-face back"></div>
          <div className="cube-face right"></div>
          <div className="cube-face left"></div>
          <div className="cube-face top"></div>
          <div className="cube-face bottom"></div>
        </div>
      </div>

      <div style={{ position: 'relative', textAlign: 'center', zIndex: 2 }}>
        <h1 className="holographic-text" style={{ 
          fontSize: 'clamp(4rem, 12vw, 10rem)', 
          margin: 0, 
          fontFamily: 'Outfit',
          lineHeight: 1,
          fontWeight: 800,
          color: '#fff'
        }}>
          {progress}%
        </h1>
        <p style={{ 
          color: 'var(--accent-teal)', 
          letterSpacing: '0.5em', 
          textTransform: 'uppercase',
          marginTop: '1rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          textShadow: '0 0 10px var(--accent-teal)'
        }}>
          ESTABLISHING 3D GRID
        </p>
      </div>

      {/* 3D progress bar frame */}
      <div style={{
        position: 'absolute',
        bottom: '10vh',
        left: '50%',
        transform: 'translateX(-50%) perspective(500px) rotateX(30deg)',
        width: '60%',
        height: '20px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(0, 229, 255, 0.3)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
        zIndex: 2
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-teal))',
          boxShadow: '0 0 20px var(--accent-blue)',
          transition: 'width 0.1s ease-out'
        }} />
      </div>
    </motion.div>
  );
}
