import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const puzzles = [
  {
    id: 'wordmatch',
    emoji: '🔤',
    title: 'Word Match',
    desc: 'Match the word to the right picture!',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)',
    shadow: 'rgba(99,102,241,0.40)',
    badge: 'Words & Pics',
  },
  {
    id: 'pattern',
    emoji: '🔮',
    title: 'Pattern Puzzle',
    desc: 'What comes next in the pattern?',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
    shadow: 'rgba(244,63,94,0.40)',
    badge: 'Sequences',
  },
  {
    id: 'counting',
    emoji: '🔢',
    title: 'Counting Fun',
    desc: 'Count the objects and pick the number!',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    shadow: 'rgba(16,185,129,0.40)',
    badge: 'Numbers',
  },
  {
    id: 'colorsort',
    emoji: '🎨',
    title: 'Color Sort',
    desc: 'Sort the colored blobs into the right buckets!',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    shadow: 'rgba(245,158,11,0.40)',
    badge: 'Colors',
  },
  {
    id: 'jigsaw',
    emoji: '🧩',
    title: 'Jigsaw Puzzle',
    desc: 'Swap pieces to rebuild the picture!',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    shadow: 'rgba(236,72,153,0.40)',
    badge: '4 Scenes',
  },
];

const PuzzlePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '760px', marginBottom: '48px' }}>
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate('/')}
          className="glass"
          style={{ padding: '12px 24px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', border: 'none', color: 'var(--text)', cursor: 'pointer', marginBottom: '36px' }}
        >
          <ChevronLeft size={20} /> Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '12px' }}>🧩</div>
          <h1 style={{ fontSize: '4rem', color: 'var(--primary)', margin: '0 0 10px' }}>Puzzles</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: '700', margin: 0 }}>
            Pick a puzzle and sharpen your mind! 🧠
          </p>
        </motion.div>
      </div>

      {/* Puzzle Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', width: '100%', maxWidth: '760px' }}>
        {puzzles.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.12 }}
            whileHover={{ scale: 1.05, y: -8 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/puzzles/${p.id}`)}
            style={{
              background: p.gradient,
              borderRadius: '28px',
              padding: '40px 32px 36px',
              cursor: 'pointer',
              boxShadow: `0 20px 50px ${p.shadow}`,
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'left',
            }}
          >
            {/* Decorative orb */}
            <div style={{
              position: 'absolute', top: '-30px', right: '-30px',
              width: '120px', height: '120px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '50%',
            }} />

            {/* Badge */}
            <div style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'rgba(255,255,255,0.25)',
              borderRadius: '40px', padding: '5px 14px',
              color: 'white', fontWeight: '800', fontSize: '0.78rem', letterSpacing: '0.05em'
            }}>
              {p.badge}
            </div>

            <div style={{ fontSize: '3.2rem', marginBottom: '16px' }}>{p.emoji}</div>
            <h2 style={{ fontSize: '2.2rem', color: 'white', margin: '0 0 10px' }}>{p.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.88)', fontWeight: '600', margin: 0, fontSize: '1.02rem' }}>{p.desc}</p>
            <div style={{ marginTop: '28px', color: 'white', fontWeight: '900', fontSize: '1.5rem' }}>→</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PuzzlePage;
