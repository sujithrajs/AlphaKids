import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Star, BookOpen } from 'lucide-react';
import Mascot from '../components/Mascot';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'radial-gradient(circle at center, #ffffff 0%, #f0f3f5 100%)',
      overflow: 'hidden'
    }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', position: 'relative' }}
      >
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <Mascot size={250} />
        </div>

        <motion.h1 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ 
            fontSize: '4.5rem', 
            color: 'var(--primary)', 
            marginBottom: '10px',
            textShadow: '0 10px 20px rgba(108, 92, 231, 0.1)'
          }}
        >
          AlphaKids
        </motion.h1>
        
        <p style={{ 
          fontSize: '1.5rem', 
          color: 'var(--text-muted)', 
          marginBottom: '40px',
          fontWeight: '600'
        }}>
          Let's learn to write together! ✨
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/alphabet')}
            style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '20px 40px',
              borderRadius: '30px',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              boxShadow: '0 15px 30px rgba(108, 92, 231, 0.3)',
              cursor: 'pointer'
            }}
          >
            <Play size={32} fill="white" /> Start Learning
          </motion.button>
          
          <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', padding: '15px', borderRadius: '20px', boxShadow: 'var(--shadow)', marginBottom: '10px' }}>
                <Star size={24} color="#fdcb6e" fill="#fdcb6e" />
              </div>
              <span style={{ fontWeight: 'bold' }}>Collect Stars</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', padding: '15px', borderRadius: '20px', boxShadow: 'var(--shadow)', marginBottom: '10px' }}>
                <BookOpen size={24} color="#00b894" />
              </div>
              <span style={{ fontWeight: 'bold' }}>26 Letters</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Background Decorative Circles */}
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--primary-light)', opacity: 0.1, zIndex: -1 }}></div>
      <div style={{ position: 'absolute', bottom: '-150px', right: '-150px', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--secondary-light)', opacity: 0.2, zIndex: -1 }}></div>
    </div>
  );
};

export default HomePage;
