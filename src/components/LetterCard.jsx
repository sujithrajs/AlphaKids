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
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Link to={`/trace/${letter}`} style={{ display: 'block' }}>
        <div style={{
          background: 'white',
          borderRadius: '25px',
          padding: '20px',
          textAlign: 'center',
          position: 'relative',
          boxShadow: 'var(--shadow)',
          border: `4px solid ${color}22`,
          minHeight: '140px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isCompleted && (
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              background: 'var(--secondary)',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              zIndex: 2
            }}>
              <Star size={20} fill="white" color="white" />
            </div>
          )}
          
          <span style={{
            fontSize: '3.5rem',
            fontFamily: 'var(--font-display)',
            color: color,
            lineHeight: 1
          }}>
            {letter}
          </span>
          
          <span style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            marginTop: '5px',
            fontWeight: 'bold'
          }}>
            {letter.toLowerCase()}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default LetterCard;
