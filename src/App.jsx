import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useSpring, useMotionValue, animate } from 'framer-motion';
import { Phone, ArrowRight, Zap, Building2, HardHat, Power } from 'lucide-react';
import Cursor from './components/Cursor';
import ContactModal from './components/ContactModal';
import Preloader from './components/Preloader';
import AnimatedText from './components/AnimatedText';
import './index.css';

const Counter = ({ from = 0, to, duration = 2, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          setDisplayValue(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

const ProjectItem = ({ src, title, category, description, Icon }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // 3D Tilt Logic
  const springConfig = { damping: 20, stiffness: 150 };
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-item hover-target"
      style={{ perspective: 1200 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
      }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d", width: '100%', height: '100%' }}>
        <div className="project-image-wrapper">
          <motion.img 
            src={src} 
            alt={title} 
            className="project-image" 
            style={{ y, scale: 1.15 }} 
          />
        </div>
        <div className="project-overlay" style={{ transform: "translateZ(60px)" }}>
          <span className="project-category"><Icon size={16} style={{display:'inline', marginRight:'8px'}}/> {category}</span>
          <h3 className="project-title">{title}</h3>
          <p style={{ color: '#ccc', maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.5' }}>
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const reviews = [
    { name: "Rajeev Sharma", text: "Saurabh and his team handled the entire electrical infrastructure for our new housing society. Absolute professionalism and flawless execution." },
    { name: "Amit Desai", text: "We hired them for our factory's heavy-duty panel installations. They completed the work ahead of schedule with zero safety compromises. Highly recommended." },
    { name: "Vikram Singh", text: "The architectural lighting and smart wiring for our boutique hotel was done by this team. Excellent attention to detail and premium finish." },
    { name: "Suresh Gupta", text: "Best electrical contractors in the business. Very transparent pricing and they strictly adhere to all government safety standards." }
  ];

  return (
    <section className="section container" style={{ padding: '5vh 0 15vh 0' }}>
      <div className="projects-header" style={{ marginBottom: '3rem' }}>
        <h2>Client <span style={{ color: 'var(--accent-teal)' }}>Reviews</span></h2>
      </div>
      <motion.div ref={carousel} className="carousel-wrapper hover-target" style={{ overflow: "hidden", cursor: "grab" }} whileTap={{ cursor: "grabbing" }}>
        <motion.div 
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          style={{ display: "flex", gap: "2rem" }}
        >
          {reviews.map((review, i) => (
            <motion.div key={i} className="review-card" style={{ minWidth: '400px', background: 'rgba(255,255,255,0.05)', padding: '2.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1.2rem' }}>"{review.text}"</p>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.3rem' }}>- {review.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

function App() {
  const containerRef = useRef(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        setShowWhatsApp(true);
      } else {
        setShowWhatsApp(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <AnimatedText text="Premier Electrical Contractor" className="hover-target" />
          </motion.h2>
          <motion.h1 
            className="hero-title"
            layoutId="hero-title"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedText text="SAURABH" className="hover-target" /> <br /> <AnimatedText text="KATIYAR" className="hover-target" />
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
        <div className="circuit-pattern"></div>
        <div className="about-grid" style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div 
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            style={{ textAlign: 'center', maxWidth: '900px' }}
          >
            <h2>
              <AnimatedText text="Powering the Future." className="hover-target" />
            </h2>
            <p style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              <AnimatedText text="With over 15+ years of dedicated experience, Saurabh Katiyar has established himself as a leading force in large-scale electrical contracting." className="hover-target" />
            </p>
            <p style={{ fontSize: '1.5rem' }}>
              Specializing in complex, high-stakes environments like major hotels, multi-story residential societies, and large-scale factories, we deliver safety, precision, and unparalleled expertise.
            </p>
            
            <div className="stats" style={{ justifyContent: 'center', marginTop: '4rem' }}>
              <div className="stat-item">
                <h3><Counter from={0} to={20} suffix="+" /></h3>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <h3><Counter from={0} to={100} suffix="+" /></h3>
                <span className="stat-label">Major Projects</span>
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
          <ProjectItem 
            src="/images/hotel.jpg"
            title="Hotel Contracts"
            category="Hospitality Infrastructure"
            description="Executing sophisticated electrical infrastructure for luxury hotels. Ensuring seamless power delivery, elegant architectural lighting, and absolute reliability for guest experiences."
            Icon={Building2}
          />
          <ProjectItem 
            src="/images/multistory.jpg"
            title="Multi-Story Contracts"
            category="Urban Development"
            description="Comprehensive electrical planning and execution for large-scale multi-story buildings and residential societies. Delivering modern, smart-home ready infrastructure for thousands of residents."
            Icon={Building2}
          />
          <ProjectItem 
            src="/images/factory.jpg"
            title="Factory Contracts"
            category="Industrial Power"
            description="Heavy-duty electrical installations for massive industrial factory floors. From high-voltage machinery wiring to robust control panels, powering industrial growth safely."
            Icon={Zap}
          />
        </div>
      </section>

      <Testimonials />

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="circuit-pattern"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="contact-title">
            <AnimatedText text="Let's spark something" className="hover-target" /> <br/> 
            <span style={{ color: 'var(--text-primary)'}}>
              <AnimatedText text="Extraordinary" className="hover-target" />
            </span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
            <a href="tel:+918700322743" className="contact-number hover-target" style={{ textDecoration: 'none' }}>
              <AnimatedText text="+91 870 032 2743" className="hover-target" />
            </a>
            <a href="tel:+917976911880" className="contact-number hover-target" style={{ textDecoration: 'none' }}>
              <AnimatedText text="+91 7976 911 880" className="hover-target" />
            </a>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '1rem' }}>
              <AnimatedText text="Available for major electrical contracts" className="hover-target" />
            </p>
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

      {/* Theme Toggle Button */}
      <button 
        onClick={() => setIsLightMode(!isLightMode)} 
        className="theme-toggle hover-target"
        aria-label="Toggle Theme"
      >
        <Power size={24} />
      </button>

      {/* Floating WhatsApp Button */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.a 
            href="https://wa.me/918700322743" 
            target="_blank" 
            rel="noopener noreferrer"
            className="whatsapp-float hover-target"
            aria-label="Chat on WhatsApp"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <WhatsAppIcon />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
