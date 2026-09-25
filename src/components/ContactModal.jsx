import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Zap } from 'lucide-react';
import AnimatedText from './AnimatedText';
import Select from 'react-select';

const projectOptions = [
  { value: 'hotel', label: 'Hotel Contracts' },
  { value: 'multistory', label: 'Multi-Story Contracts' },
  { value: 'factory', label: 'Factory Contracts' },
  { value: 'other', label: 'Other Commercial Works' }
];

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: state.isFocused ? '1px solid var(--accent-teal)' : '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 0,
    boxShadow: 'none',
    padding: '0',
    minHeight: 'auto',
    cursor: 'none'
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '10px 0',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--text-primary)',
    margin: 0,
    padding: 0
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--text-primary)',
    fontSize: '1.1rem',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--text-secondary)',
    fontSize: '1.1rem',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'var(--text-secondary)',
    padding: '10px 0',
    '&:hover': { color: 'var(--accent-teal)' }
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#111',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '8px',
    zIndex: 100,
    marginTop: '4px'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? 'var(--accent-teal)' 
      : state.isFocused 
        ? 'rgba(0, 229, 255, 0.1)' 
        : 'transparent',
    color: state.isSelected ? '#000' : 'var(--text-primary)',
    cursor: 'none',
    padding: '12px 20px',
    '&:active': {
      backgroundColor: 'var(--accent-teal)',
      color: '#000'
    }
  })
};

export default function ContactModal({ isOpen, onClose }) {
  const [formState, setFormState] = useState('idle');
  const [typingField, setTypingField] = useState(null);

  const handleInput = (e) => {
    const id = e.target.id;
    setTypingField(id);
    setTimeout(() => setTypingField(null), 150);
  };

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
                  <a href="tel:+918700322743" className="contact-badge hover-target" style={{ textDecoration: 'none' }}>
                     <Zap size={16} /> Contact Us
                  </a>
                </div>

                {/* Right Pane */}
                <div className="modal-right">
                  <h3><AnimatedText text="Contact Us" /></h3>
                  <form onSubmit={handleSubmit} className="immersive-form-grid">
                    <div className="input-group">
                      <input type="text" id="firstName" required placeholder=" " className={`hover-target ${typingField === 'firstName' ? 'typing-pop' : ''}`} onChange={handleInput} />
                      <label htmlFor="firstName">First Name</label>
                      <div className="input-highlight"></div>
                    </div>
                    <div className="input-group">
                      <input type="text" id="lastName" required placeholder=" " className={`hover-target ${typingField === 'lastName' ? 'typing-pop' : ''}`} onChange={handleInput} />
                      <label htmlFor="lastName">Last Name</label>
                      <div className="input-highlight"></div>
                    </div>
                    <div className="input-group">
                      <input type="tel" id="phone" required placeholder=" " className={`hover-target ${typingField === 'phone' ? 'typing-pop' : ''}`} onChange={handleInput} />
                      <label htmlFor="phone">Phone Number</label>
                      <div className="input-highlight"></div>
                    </div>
                    <div className="input-group">
                      <input type="email" id="email" required placeholder=" " className={`hover-target ${typingField === 'email' ? 'typing-pop' : ''}`} onChange={handleInput} />
                      <label htmlFor="email">Email Address</label>
                      <div className="input-highlight"></div>
                    </div>
                    <div className="input-group full-width" style={{ position: 'relative', zIndex: 100 }}>
                      <Select 
                        options={projectOptions}
                        styles={customSelectStyles}
                        placeholder="Select Project Type"
                        className="hover-target"
                        classNamePrefix="react-select"
                        isSearchable={false}
                      />
                      <div className="input-highlight"></div>
                    </div>
                    <div className="input-group full-width">
                      <textarea id="message" required placeholder=" " rows="3" className={`hover-target ${typingField === 'message' ? 'typing-pop' : ''}`} onChange={handleInput}></textarea>
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
