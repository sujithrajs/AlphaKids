import React from 'react';
import { motion } from 'framer-motion';

const Mascot = ({ mood = 'happy', size = 200 }) => {
  const isBlinking = mood === 'happy' || mood === 'idle';
  
  const bodyVariants = {
    happy: { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } },
    excited: { y: [0, -20, 0], scale: [1, 1.1, 1], transition: { duration: 0.5, repeat: Infinity } },
    focused: { scale: [1, 1.02, 1], transition: { duration: 3, repeat: Infinity } },
    thinking: { rotate: [-5, 5, -5], transition: { duration: 2, repeat: Infinity } },
    clapping: { scale: [1, 1.1, 1], transition: { duration: 0.3, repeat: Infinity } }
  };

  return (
    <motion.div
      animate={mood === 'excited' ? { rotate: [0, 360] } : (mood === 'clapping' ? { y: [0, -15, 0] } : {
        y: [0, -10, 0],
        rotate: [-2, 2, -2]
      })}
      transition={mood === 'excited' ? { duration: 2, repeat: Infinity, ease: "linear" } : {
        duration: mood === 'clapping' ? 0.3 : 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ width: size, height: size, position: 'relative' }}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <motion.circle 
          cx="100" cy="100" r="80" 
          fill="var(--primary-light)" 
          animate={bodyVariants[mood] || bodyVariants.happy}
        />
        
        {/* Face */}
        <circle cx="100" cy="100" r="65" fill="white" fillOpacity="0.3" />
        
        {/* Eyes */}
        <motion.g
          animate={mood === 'focused' ? { scaleY: 0.6 } : (isBlinking ? { scaleY: [1, 1, 0.1, 1, 1] } : {})}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.9, 0.92, 0.94, 1] }}
        >
          <circle cx="70" cy="85" r="10" fill="var(--text)" />
          <circle cx="130" cy="85" r="10" fill="var(--text)" />
        </motion.g>

        {/* Cheeks */}
        <circle cx="60" cy="105" r="8" fill="var(--accent-light)" fillOpacity="0.6" />
        <circle cx="140" cy="105" r="8" fill="var(--accent-light)" fillOpacity="0.6" />

        {/* Mouth */}
        {(mood === 'happy' || mood === 'clapping') && (
          <path d="M75 120 C 75 120, 100 145, 125 120" stroke="var(--text)" strokeWidth="6" strokeLinecap="round" />
        )}
        {mood === 'excited' && (
          <path d="M70 120 C 70 120, 100 155, 130 120" stroke="var(--text)" strokeWidth="8" strokeLinecap="round" />
        )}
        {mood === 'surprised' && (
          <circle cx="100" cy="130" r="12" stroke="var(--text)" strokeWidth="6" />
        )}
        {mood === 'thinking' && (
          <path d="M80 130 L 120 130" stroke="var(--text)" strokeWidth="6" strokeLinecap="round" />
        )}
        {mood === 'focused' && (
          <path d="M85 130 C 85 130, 100 135, 115 130" stroke="var(--text)" strokeWidth="4" strokeLinecap="round" />
        )}

        {/* Hands / Clapping */}
        {mood === 'clapping' ? (
          <g>
            <motion.circle 
              cx="100" cy="110" r="15" fill="var(--primary)" 
              animate={{ x: [-60, -20, -60] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
            <motion.circle 
              cx="100" cy="110" r="15" fill="var(--primary)" 
              animate={{ x: [60, 20, 60] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
          </g>
        ) : (
          <>
            <circle cx="20" cy="110" r="12" fill="var(--primary)" opacity="0.6" />
            <circle cx="180" cy="110" r="12" fill="var(--primary)" opacity="0.6" />
          </>
        )}

        {/* Antennae / Ears */}
        <motion.circle 
          cx="60" cy="40" r="15" fill="var(--primary)" 
          animate={mood === 'excited' ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <motion.circle 
          cx="140" cy="40" r="15" fill="var(--primary)" 
          animate={mood === 'excited' ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
        />
      </svg>
    </motion.div>
  );
};

export default Mascot;
