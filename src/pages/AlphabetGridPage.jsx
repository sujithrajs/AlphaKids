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
      padding: '40px 20px',
      background: '#f1f2f6'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'white',
              padding: '12px 24px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow)',
              fontWeight: 'bold'
            }}
          >
            <ChevronLeft size={20} /> Back
          </button>

          <div style={{ textAlign: 'center', flex: 1 }}>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '10px' }}>
              Choose a Letter
            </h1>
            
            <div style={{ maxWidth: '400px', margin: '0 auto 15px auto' }}>
              <div style={{ 
                height: '12px', 
                background: '#dfe6e9', 
                borderRadius: '6px',
                overflow: 'hidden',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / 26) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ 
                    height: '100%', 
                    background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%)',
                    borderRadius: '6px'
                  }}
                />
              </div>
              <div style={{ 
                marginTop: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px',
                color: 'var(--text-muted)',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                <Trophy size={16} color="#fdcb6e" fill="#fdcb6e" />
                <span>{completedCount} of 26 letters collected!</span>
              </div>
            </div>
          </div>

          <div style={{ width: '100px' }} className="hide-mobile"></div> {/* Spacer */}
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '20px',
          paddingBottom: '40px'
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
