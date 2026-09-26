import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Dynamically import all images in the folder so Vite can bundle them
const modules = import.meta.glob('/src/assets/ezgif-4899d5f40f5e8bc1-jpg/*.jpg', { eager: true });
const frameUrls = Object.keys(modules).sort().map(key => modules[key].default || modules[key]);

export default function Preloader({ onComplete }) {
  // Start at the middle frame
  const [frameIndex, setFrameIndex] = useState(Math.floor(frameUrls.length / 2) || 0);
  const [loadedPercent, setLoadedPercent] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = frameUrls.length;
    
    // Fallback if no frames are found
    if (totalFrames === 0) {
       setTimeout(onComplete, 7500);
       return;
    }

    // Enforce 7-8 seconds minimum loading time as requested
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 7500));
    
    // Preload all frames to memory so they swap instantly without flickering
    const imagePromises = frameUrls.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          setLoadedPercent(Math.floor((loadedCount / totalFrames) * 100));
          resolve();
        };
        img.onerror = resolve;
      });
    });

    // Wait for BOTH the images to load AND the 7.5 seconds to pass
    Promise.all([Promise.all(imagePromises), minTimePromise]).then(() => {
      setTimeout(onComplete, 500);
    });
  }, [onComplete]);

  // Mouse/Touch Tracking Logic
  useEffect(() => {
    if (frameUrls.length === 0) return;

    const handleMouseMove = (e) => {
      const xPercent = e.clientX / window.innerWidth;
      const frame = Math.max(0, Math.min(frameUrls.length - 1, Math.floor(xPercent * frameUrls.length)));
      setFrameIndex(frame);
    };
    
    const handleTouchMove = (e) => {
      const xPercent = e.touches[0].clientX / window.innerWidth;
      const frame = Math.max(0, Math.min(frameUrls.length - 1, Math.floor(xPercent * frameUrls.length)));
      setFrameIndex(frame);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, y: '-100vh', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff', // Clean white background as requested
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000000',
        fontFamily: "'Space Grotesk', sans-serif"
      }}
    >
      {frameUrls.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ position: 'relative', width: '350px', height: '350px', marginBottom: '3rem', mixBlendMode: 'multiply' }}
        >
           <img 
             src={frameUrls[frameIndex]} 
             alt="Interactive loader"
             style={{ width: '100%', height: '100%', objectFit: 'contain' }}
           />
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800, marginBottom: '1rem', fontFamily: "'Outfit', sans-serif" }}>
          Loading Experience
        </h2>
        
        {/* Sleek loading bar */}
        <div style={{ width: '200px', height: '2px', background: 'rgba(0,0,0,0.1)', margin: '0 auto 1rem auto', overflow: 'hidden' }}>
           <div style={{ height: '100%', width: `${loadedPercent}%`, background: '#000', transition: 'width 0.2s ease-out' }}></div>
        </div>

        <div style={{ fontSize: '1.2rem', color: '#888', letterSpacing: '0.1em', fontWeight: 600 }}>
          {loadedPercent}%
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ position: 'absolute', bottom: '3rem', color: '#aaa', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}
      >
        Move your mouse to interact
      </motion.div>
    </motion.div>
  );
}
