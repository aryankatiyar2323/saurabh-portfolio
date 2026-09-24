import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight, Zap, Building2, HardHat } from 'lucide-react';
import Cursor from './components/Cursor';
import ContactModal from './components/ContactModal';
import Preloader from './components/Preloader';
import './index.css';

function App() {
  const containerRef = useRef(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Parallax effects
  const yHeroBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Reveal Animation Variants
  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div ref={containerRef} className="app-container">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Cursor />

      {/* Hero Section */}
      <section className="hero">
        <motion.img
          src="/images/bg.jpg"
          alt="Abstract Electrical Wiring"
          className="hero-bg"
          style={{ y: yHeroBg }}
        />
        <div className="hero-overlay"></div>
        <motion.div
          className="hero-content"
          style={{ opacity: opacityHero }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={!isLoading ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.h2 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Electrical Contractor & Builder
          </motion.h2>
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            SAURABH <br /> KATIYAR
          </motion.h1>
          <motion.button 
            onClick={() => setIsContactModalOpen(true)}
            className="hover-target"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ 
              marginTop: '2rem', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--accent-color)',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: 'transparent',
              border: 'none',
              cursor: 'none'
            }}
          >
            Start a Project <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </section>

      {/* Marquee Banner */}
      <div className="marquee-container">
        <motion.div 
          className="marquee-content"
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
        >
          <span className="marquee-text">20+ YEARS OF EXCELLENCE •</span>
          <span className="marquee-text">HOTEL CONTRACTS •</span>
          <span className="marquee-text">MULTI-STORY CONTRACTS •</span>
          <span className="marquee-text">FACTORY CONTRACTS •</span>
          <span className="marquee-text">20+ YEARS OF EXCELLENCE •</span>
          <span className="marquee-text">HOTEL CONTRACTS •</span>
          <span className="marquee-text">MULTI-STORY CONTRACTS •</span>
          <span className="marquee-text">FACTORY CONTRACTS •</span>
        </motion.div>
      </div>

      {/* About Section */}
      <section className="section container">
        <div className="about-grid" style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div 
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            style={{ textAlign: 'center', maxWidth: '900px' }}
          >
            <h2>Powering the Future, <br/>Building the Present.</h2>
            <p style={{ fontSize: '1.5rem' }}>
              With over 15+ years of dedicated experience, Saurabh Katiyar has established himself as a leading force in large-scale electrical contracting and building construction.
            </p>
            <p style={{ fontSize: '1.5rem' }}>
              Specializing in complex, high-stakes environments like major hotels, multi-story residential societies, and large-scale factories, we deliver safety, precision, and unparalleled expertise.
            </p>
            
            <div className="stats" style={{ justifyContent: 'center', marginTop: '4rem' }}>
              <div className="stat-item">
                <h3>20+</h3>
                <span>Years Experience</span>
              </div>
              <div className="stat-item">
                <h3>100+</h3>
                <span>Major Projects</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="section container">
        <motion.div 
          className="projects-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2>Featured <br/> <span style={{ color: 'var(--accent-blue)' }}>Expertise</span></h2>
        </motion.div>

        <div className="project-list">
          {/* Project 1 */}
          <motion.div 
            className="project-item hover-target"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
            <div className="project-image-wrapper">
              <img src="/images/hotel.jpg" alt="Hotel Electrical Contracts" className="project-image" />
            </div>
            <div className="project-overlay">
              <span className="project-category"><Building2 size={16} style={{display:'inline', marginRight:'8px'}}/> Hospitality Infrastructure</span>
              <h3 className="project-title">Hotel Contracts</h3>
              <p style={{ color: '#ccc', maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.5' }}>
                Executing sophisticated electrical infrastructure for luxury hotels. Ensuring seamless power delivery, elegant architectural lighting, and absolute reliability for guest experiences.
              </p>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            className="project-item hover-target"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
            <div className="project-image-wrapper">
              <img src="/images/multistory.jpg" alt="Multi-Story Electrical Contracts" className="project-image" />
            </div>
            <div className="project-overlay">
              <span className="project-category" style={{ color: 'var(--text-primary)'}}><Building2 size={16} style={{display:'inline', marginRight:'8px'}}/> Urban Development</span>
              <h3 className="project-title">Multi-Story Contracts</h3>
              <p style={{ color: '#ccc', maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.5' }}>
                Comprehensive electrical planning and execution for large-scale multi-story buildings and residential societies. Delivering modern, smart-home ready infrastructure for thousands of residents.
              </p>
            </div>
          </motion.div>

          {/* Project 3 */}
          <motion.div 
            className="project-item hover-target"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
            <div className="project-image-wrapper">
              <img src="/images/factory.jpg" alt="Factory Electrical Contracts" className="project-image" />
            </div>
            <div className="project-overlay">
              <span className="project-category" style={{ color: 'var(--accent-color)'}}><Zap size={16} style={{display:'inline', marginRight:'8px'}}/> Industrial Power</span>
              <h3 className="project-title">Factory Contracts</h3>
              <p style={{ color: '#ccc', maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.5' }}>
                Heavy-duty electrical installations for massive industrial factory floors. From high-voltage machinery wiring to robust control panels, powering industrial growth safely.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="contact-title">Let's build something <br/> <span style={{ color: 'var(--text-primary)'}}>Extraordinary</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
            <a href="tel:+918700322743" className="contact-number hover-target">
              +91 870 032 2743
            </a>
            <a href="tel:+917976911880" className="contact-number hover-target">
              +91 7976 911 880
            </a>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '1rem' }}>Available for major electrical & building contracts</p>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="hover-target" 
              style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontSize: '1.5rem', background: 'transparent', border: 'none', cursor: 'none' }}
            >
              contact@saurabhkatiyar.com
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Saurabh Katiyar. All Rights Reserved.</p>
      </footer>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}

export default App;
