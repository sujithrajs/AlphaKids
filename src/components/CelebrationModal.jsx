import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, ArrowRight, RefreshCw } from 'lucide-react';

const CelebrationModal = ({ isOpen, onNext, onRetry, letter }) => {
  // Celebration logic resides in TracingPage to sync with sound

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 100 }}
            style={{
              background: 'white',
              padding: '40px',
              borderRadius: '40px',
              textAlign: 'center',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ display: 'inline-block', marginBottom: '20px' }}
            >
              <Star size={80} fill="#fdcb6e" color="#fdcb6e" />
            </motion.div>
            
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--primary)' }}>Great Job!</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px' }}>
              You traced the letter <strong>{letter}</strong> perfectly!
            </p>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                onClick={onRetry}
                style={{
                  padding: '15px 25px',
                  borderRadius: '20px',
                  background: 'var(--bg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: 'var(--text)'
                }}
              >
                <RefreshCw size={20} /> Try Again
              </button>
              <button 
                onClick={onNext}
                style={{
                  padding: '15px 30px',
                  borderRadius: '20px',
                  background: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                Next <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationModal;
