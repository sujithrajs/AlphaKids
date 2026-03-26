import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, ArrowRight, RefreshCw } from 'lucide-react';

const CelebrationModal = ({ isOpen, onNext, onRetry, letter, nextLabel = 'Next Letter', itemType = 'letter' }) => {
  // Celebration logic resides in TracingPage to sync with sound

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="glass"
            style={{
              padding: '60px 40px',
              borderRadius: '40px',
              textAlign: 'center',
              maxWidth: '500px',
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid white',
              boxShadow: '0 40px 100px rgba(0,0,0,0.2)'
            }}
          >
            {/* Animated Background Orbs */}
            <div style={{
              position: 'absolute',
              top: '-20%',
              left: '-20%',
              width: '150px',
              height: '150px',
              background: 'var(--primary)',
              filter: 'blur(100px)',
              opacity: 0.2,
              zIndex: -1
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-20%',
              right: '-20%',
              width: '150px',
              height: '150px',
              background: 'var(--secondary)',
              filter: 'blur(100px)',
              opacity: 0.2,
              zIndex: -1
            }} />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ position: 'absolute', top: '20px', left: '20px', opacity: 0.1 }}
            >
              <Star size={60} color="var(--secondary)" fill="var(--secondary)" />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
              style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}
            >
              <div style={{
                width: '120px',
                height: '120px',
                background: 'var(--secondary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 20px rgba(251, 191, 36, 0.3)',
                border: '6px solid white'
              }}>
                <Star size={60} fill="white" color="white" />
              </div>
            </motion.div>

            <h2 style={{
              fontSize: '3.5rem',
              color: 'var(--primary)',
              marginBottom: '10px',
              lineHeight: 1
            }}>
              Awesome!
            </h2>
            <p style={{
              fontSize: '1.4rem',
              color: 'var(--text-muted)',
              marginBottom: '40px',
              fontWeight: '600'
            }}>
              You traced the {itemType} <strong>{letter}</strong> perfectly!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                  color: 'white',
                  padding: '18px 40px',
                  borderRadius: '20px',
                  fontSize: '1.4rem',
                  fontWeight: '900',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: '0 15px 30px rgba(99, 102, 241, 0.3)',
                  border: 'none'
                }}
              >
                {nextLabel} <ArrowRight size={24} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetry}
                style={{
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  padding: '12px',
                  borderRadius: '15px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: 'none'
                }}
              >
                <RefreshCw size={20} /> Try Again
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

};

export default CelebrationModal;
