import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Zap } from 'lucide-react';
import AnimatedText from './AnimatedText';

export default function ContactModal({ isOpen, onClose }) {
  const [formState, setFormState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Animated glowing background behind modal */}
          <div className="modal-glow modal-glow-1"></div>
          <div className="modal-glow modal-glow-2"></div>
          <div className="modal-glow modal-glow-3"></div>

          <motion.div 
            className="modal-container"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <button className="modal-close hover-target" onClick={onClose}>
              <X size={28} />
            </button>

            {formState !== 'success' ? (
              <div className="modal-two-pane">
                {/* Left Pane */}
                <div className="modal-left">
                  <div className="badge hover-target"><AnimatedText text="Contact" /></div>
                  <h2 className="modal-left-title"><AnimatedText text="Get in touch" /><br/><AnimatedText text="with us!" /></h2>
                  <p className="modal-left-desc">
                    <AnimatedText text="Ready to power up your next big project? We specialize in large-scale electrical contracting for Hotels, Multi-Story Buildings, and Factories. Let's connect." />
                  </p>
                  <div className="contact-badge hover-target">
                     <Zap size={16} /> Contact Us
                  </div>
                </div>

                {/* Right Pane */}
                <div className="modal-right">
                  <h3><AnimatedText text="Contact Us" /></h3>
                  <form onSubmit={handleSubmit} className="immersive-form-grid">
                    <div className="input-group">
                      <input type="text" id="firstName" required placeholder=" " className="hover-target" />
                      <label htmlFor="firstName">First Name</label>
                      <div className="input-highlight"></div>
                    </div>
                    <div className="input-group">
                      <input type="text" id="lastName" required placeholder=" " className="hover-target" />
                      <label htmlFor="lastName">Last Name</label>
                      <div className="input-highlight"></div>
                    </div>
                    <div className="input-group">
                      <input type="tel" id="phone" required placeholder=" " className="hover-target" />
                      <label htmlFor="phone">Phone Number</label>
                      <div className="input-highlight"></div>
                    </div>
                    <div className="input-group">
                      <input type="email" id="email" required placeholder=" " className="hover-target" />
                      <label htmlFor="email">Email Address</label>
                      <div className="input-highlight"></div>
                    </div>
                    <div className="input-group full-width">
                      <select id="projectType" required className="hover-target" defaultValue="">
                        <option value="" disabled>Select Project Type</option>
                        <option value="hotel">Hotel Contracts</option>
                        <option value="multistory">Multi-Story Contracts</option>
                        <option value="factory">Factory Contracts</option>
                        <option value="other">Other Commercial Works</option>
                      </select>
                      <div className="input-highlight"></div>
                    </div>
                    <div className="input-group full-width">
                      <textarea id="message" required placeholder=" " rows="3" className="hover-target"></textarea>
                      <label htmlFor="message">Message</label>
                      <div className="input-highlight"></div>
                    </div>
                    
                    <button 
                      type="submit" 
                      className={`submit-btn hover-target ${formState === 'submitting' ? 'submitting' : ''}`}
                      disabled={formState === 'submitting'}
                    >
                      {formState === 'submitting' ? (
                         <span className="btn-text" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>Transmitting... <Zap size={16} className="spin-fast" /></span>
                      ) : (
                         <span className="btn-text">Submit</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <motion.div 
                className="modal-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                 <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, -10, 0] }}
                    transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                  >
                    <CheckCircle size={80} color="var(--accent-teal)" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ marginTop: '2rem', color: 'var(--accent-teal)' }}
                  >
                    <AnimatedText text="Circuit Complete!" />
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ color: '#aaa', maxWidth: '400px', margin: '1rem auto' }}
                  >
                    Your requirements have been successfully transmitted. We will analyze the scope and contact you shortly.
                  </motion.p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
