import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Trophy } from 'lucide-react';
import LetterCard from '../components/LetterCard';
import { useProgress } from '../hooks/useProgress';

const AlphabetGridPage = () => {
  const navigate = useNavigate();
  const { completedLetters } = useProgress();
  
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const completedCount = Object.keys(completedLetters).length;

  return (
    <div className="alphabet-grid-page" style={{
      minHeight: '100vh',
      padding: '60px 20px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '60px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <motion.button 
            whileHover={{ x: -5 }}
            onClick={() => navigate('/')}
            className="glass"
            style={{
              padding: '12px 24px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 'bold',
              border: 'none',
              color: 'var(--text)'
            }}
          >
            <ChevronLeft size={20} /> Back
          </motion.button>

          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              color: 'var(--primary)', 
              marginBottom: '10px',
              textShadow: '0 4px 12px rgba(99, 102, 241, 0.1)'
            }}>
              Choose a Letter
            </h1>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '8px 24px',
                borderRadius: '30px',
                color: 'var(--text-muted)',
                fontWeight: '800',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              <Trophy size={18} color="var(--secondary)" fill="var(--secondary)" />
              <span>{completedCount} / 26 Collected</span>
            </motion.div>
          </div>

          <div style={{ width: '100px' }} className="hide-mobile"></div>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '24px',
          paddingBottom: '80px'
        }}>
          {alphabets.map((char, index) => (
            <LetterCard 
              key={char} 
              letter={char} 
              index={index}
              isCompleted={!!completedLetters[char]} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlphabetGridPage;
