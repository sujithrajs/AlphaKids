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
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}
        >
          <Mascot size={280} />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ 
            fontSize: '5.5rem', 
            color: 'var(--primary)', 
            marginBottom: '15px',
            textShadow: '0 10px 30px rgba(99, 102, 241, 0.2)',
            lineHeight: 1
          }}
        >
          AlphaKids
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ 
            fontSize: '1.6rem', 
            color: 'var(--text-muted)', 
            marginBottom: '50px',
            fontWeight: '600',
            maxWidth: '500px',
            margin: '0 auto 50px'
          }}
        >
          The most fun way to learn writing the alphabet! ✨
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/alphabet')}
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
              color: 'white',
              padding: '24px 60px',
              borderRadius: '40px',
              fontSize: '2rem',
              fontWeight: '900',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
              border: 'none'
            }}
          >
            <Play size={40} fill="white" /> Start Free
          </motion.button>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: '40px', marginTop: '20px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <div className="glass" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', marginBottom: '12px' }}>
                <Star size={28} color="var(--secondary)" fill="var(--secondary)" />
              </div>
              <span style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--text-muted)' }}>REWARDS</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="glass" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', marginBottom: '12px' }}>
                <BookOpen size={28} color="var(--success)" />
              </div>
              <span style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--text-muted)' }}>26 LEVELS</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

};

export default HomePage;
