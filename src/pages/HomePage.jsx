import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Mascot from '../components/Mascot';

const subjects = [
  {
    id: 'alphabet',
    route: '/alphabet',
    emoji: '🔤',
    title: 'Alphabet',
    desc: 'Trace A to Z and build super letter skills!',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
    shadow: 'rgba(99,102,241,0.45)',
    badgeColor: '#818cf8',
    badge: '26 Letters',
  },
  {
    id: 'math',
    route: '/math',
    emoji: '🔢',
    title: 'Math Fun',
    desc: 'Add and subtract numbers with fun puzzles!',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    shadow: 'rgba(16,185,129,0.45)',
    badgeColor: '#34d399',
    badge: '+ & - Games',
  },
  {
    id: 'drawing',
    route: '/draw',
    emoji: '🎨',
    title: 'Drawing',
    desc: 'Trace shapes and figures with your finger!',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    shadow: 'rgba(245,158,11,0.45)',
    badgeColor: '#fbbf24',
    badge: '8 Shapes',
  },
  {
    id: 'puzzles',
    route: '/puzzles',
    emoji: '🧩',
    title: 'Puzzles',
    desc: 'Match words, spot patterns, and sort by color!',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    shadow: 'rgba(236,72,153,0.45)',
    badgeColor: '#f472b6',
    badge: '5 Puzzles',
  },
];

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
      overflow: 'hidden',
    }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1, width: '100%', maxWidth: '700px' }}
      >
        {/* Mascot */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}
        >
          <Mascot size={220} />
        </motion.div>

        {/* App name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{
            fontSize: '5rem',
            color: 'var(--primary)',
            marginBottom: '10px',
            textShadow: '0 10px 30px rgba(99,102,241,0.2)',
            lineHeight: 1,
          }}
        >
          KiddoLearn
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: '1.35rem',
            color: 'var(--text-muted)',
            fontWeight: '700',
            marginBottom: '50px',
          }}
        >
          Choose a subject and start learning! ✨
        </motion.p>

        {/* Subject Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px', textAlign: 'left' }}>
          {subjects.map((subj, i) => (
            <motion.div
              key={subj.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.15 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(subj.route)}
              style={{
                background: subj.gradient,
                borderRadius: '28px',
                padding: '40px 32px 36px',
                cursor: 'pointer',
                boxShadow: `0 20px 50px ${subj.shadow}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Badge */}
              <div style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'rgba(255,255,255,0.25)',
                borderRadius: '40px', padding: '5px 14px',
                color: 'white', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.05em'
              }}>
                {subj.badge}
              </div>

              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>{subj.emoji}</div>
              <h2 style={{ fontSize: '2.4rem', color: 'white', margin: '0 0 10px' }}>{subj.title}</h2>
              <p style={{ color: 'rgba(255,255,255,0.88)', fontWeight: '600', margin: 0, fontSize: '1.05rem' }}>{subj.desc}</p>

              {/* Arrow */}
              <div style={{ marginTop: '28px', color: 'white', fontWeight: '900', fontSize: '1.5rem' }}>→</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
