import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(onComplete, 500); 
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
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
      }}
    >
      <motion.h1 
        className="hero-title"
        layoutId="hero-title"
        style={{ margin: 0, textAlign: 'center', color: '#fff', position: 'relative', zIndex: 2 }}
      >
        <AnimatedText text="HIGH-VOLTAGE" className="hover-target" /> <br /> <AnimatedText text="EXCELLENCE" className="hover-target" />
      </motion.h1>

      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        style={{
          marginTop: '3rem',
          width: '200px',
          height: '2px',
          background: 'rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2
        }}
      >
        <motion.div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'var(--accent-blue)',
          boxShadow: '0 0 10px var(--accent-blue)',
        }} />
      </motion.div>
    </motion.div>
  );
}
