import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const LetterCard = ({ letter, isCompleted, index }) => {
  // Vibrant colors for the cards
  const colors = [
    '#ff7675', // red
    '#74b9ff', // blue
    '#55efc4', // green
    '#fdcb6e', // yellow
    '#a29bfe', // purple
    '#fab1a0'  // orange
  ];
  
  const color = colors[index % colors.length];

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.03,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <Link to={`/trace/${letter}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div 
          className="glass"
          style={{
            borderRadius: 'var(--radius)',
            padding: '24px',
            textAlign: 'center',
            position: 'relative',
            border: `2px solid ${color}33`,
            minHeight: '160px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.3s ease'
          }}
        >
          {isCompleted && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-12px',
                background: 'var(--secondary)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-md)',
                zIndex: 2,
                border: '4px solid white'
              }}
            >
              <Star size={20} fill="white" color="white" />
            </motion.div>
          )}
          
          <span style={{
            fontSize: '4.5rem',
            fontFamily: 'var(--font-display)',
            color: color,
            lineHeight: 1,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))',
            textDecoration: 'none'
          }}>
            {letter}
          </span>
          
          <span style={{
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            marginTop: '8px',
            fontWeight: '800',
            textTransform: 'lowercase',
            letterSpacing: '0.05em'
          }}>
            {letter.toLowerCase()}
          </span>
        </div>
      </Link>

    </motion.div>
  );

};

export default LetterCard;
