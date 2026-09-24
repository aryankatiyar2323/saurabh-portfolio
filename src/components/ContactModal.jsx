import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Zap } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [formState, setFormState] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate API call for the prototype
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5, delay: 0.3 } }
  };

  const modalVariants = {
    hidden: { y: '100%', opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', damping: 25, stiffness: 200, delay: 0.1 }
    },
    exit: { 
      y: '100%', 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div 
            className="modal-content"
            variants={modalVariants}
          >
            <button className="modal-close hover-target" onClick={onClose}>
              <X size={32} />
            </button>

            {formState !== 'success' ? (
              <motion.div className="modal-form-container" variants={staggerContainer} initial="hidden" animate="visible">
                <motion.h2 variants={itemVariants} className="modal-title">
                  Let's <span style={{ color: 'var(--accent-blue)' }}>Connect</span> <Zap size={36} style={{display:'inline', color: 'var(--accent-color)'}}/>
                </motion.h2>
                <motion.p variants={itemVariants} className="modal-subtitle">
                  Ready to power up your next big project? Fill out the details below.
                </motion.p>

                <form onSubmit={handleSubmit} className="immersive-form">
                  <motion.div variants={itemVariants} className="input-group">
                    <input type="text" id="name" required placeholder=" " className="hover-target" />
                    <label htmlFor="name">Your Name</label>
                    <div className="input-highlight"></div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="input-group">
                    <input type="email" id="email" required placeholder=" " className="hover-target" />
                    <label htmlFor="email">Email Address</label>
                    <div className="input-highlight"></div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="input-group">
                    <textarea id="message" required placeholder=" " rows="4" className="hover-target"></textarea>
                    <label htmlFor="message">Project Details</label>
                    <div className="input-highlight"></div>
                  </motion.div>

                  <motion.button 
                    variants={itemVariants}
                    type="submit" 
                    className={`submit-btn hover-target ${formState === 'submitting' ? 'submitting' : ''}`}
                    disabled={formState === 'submitting'}
                  >
                    {formState === 'submitting' ? (
                      <span className="btn-text">Establishing Connection...</span>
                    ) : (
                      <span className="btn-text">Send Message</span>
                    )}
                    <div className="btn-glitch"></div>
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                className="modal-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 15, -10, 0] }}
                  transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                >
                  <CheckCircle size={80} color="#00e5ff" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Circuit Complete!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Your message has been securely transmitted. We will review the blueprints and get back to you shortly to power your project.
                </motion.p>
                <motion.button 
                  className="close-success-btn hover-target"
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Close Window
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
