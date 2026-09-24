import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Intentionally slow down the loading to ~2.5 seconds
    const duration = 2500;
    const intervalTime = 25;
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
        }, 400); // Small pause at 100% before sliding out
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: '-100vh', 
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#050505',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', textAlign: 'right', overflow: 'hidden' }}>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: 'Outfit', fontSize: '1rem', letterSpacing: '0.3em', color: 'var(--text-secondary)', marginBottom: '10px' }}
        >
          INITIALIZING GRID
        </motion.p>
        <div style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', fontWeight: 800, lineHeight: 0.8, color: 'var(--text-primary)', fontFamily: 'Outfit' }}>
          {progress}%
        </div>
      </div>
      
      {/* Loading bar */}
      <div 
        style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          height: '4px', 
          width: `${progress}%`, 
          backgroundColor: 'var(--accent-blue)', 
          transition: 'width 0.1s linear',
          boxShadow: '0 0 15px var(--accent-blue)'
        }} 
      />
    </motion.div>
  );
}
