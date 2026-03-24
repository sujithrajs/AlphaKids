import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Plus, Minus } from 'lucide-react';

const modes = [
  {
    id: 'addition',
    label: 'Addition',
    emoji: '➕',
    desc: 'Learn to add numbers!',
    icon: Plus,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    shadow: 'rgba(16,185,129,0.4)',
  },
  {
    id: 'subtraction',
    label: 'Subtraction',
    emoji: '➖',
    desc: 'Learn to subtract numbers!',
    icon: Minus,
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    shadow: 'rgba(244,63,94,0.4)',
  },
];

const MathPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '60px', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => navigate('/')}
            className="glass"
            style={{ padding: '12px 24px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', border: 'none', color: 'var(--text)' }}
          >
            <ChevronLeft size={20} /> Back
          </motion.button>
          <div>
            <h1 style={{ fontSize: '3rem', color: 'var(--primary)', margin: 0 }}>Math Fun! 🔢</h1>
            <p style={{ color: 'var(--text-muted)', fontWeight: '700', marginTop: '8px' }}>Choose what you want to practice</p>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px' }}>
          {modes.map((mode, i) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/math/${mode.id}`)}
              style={{
                background: mode.gradient,
                borderRadius: '28px',
                padding: '40px 32px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: `0 16px 40px ${mode.shadow}`,
                color: 'white',
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{mode.emoji}</div>
              <h2 style={{ fontSize: '2.2rem', margin: '0 0 10px', color: 'white' }}>{mode.label}</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0, fontWeight: '600' }}>{mode.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MathPage;
