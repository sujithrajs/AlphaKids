import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { SHAPE_META, SHAPE_ORDER } from '../utils/shapePaths';

const DrawingMenuPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '56px', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => navigate('/')}
            className="glass"
            style={{
              padding: '12px 24px', borderRadius: 'var(--radius-sm)',
              display: 'flex', alignItems: 'center', gap: '8px',
              fontWeight: 'bold', border: 'none', color: 'var(--text)', cursor: 'pointer',
            }}
          >
            <ChevronLeft size={20} /> Back
          </motion.button>
          <div>
            <h1 style={{ fontSize: '3rem', color: 'var(--primary)', margin: 0 }}>
              Drawing Fun! 🎨
            </h1>
            <p style={{ color: 'var(--text-muted)', fontWeight: '700', marginTop: '8px' }}>
              Pick a shape and trace it with your finger!
            </p>
          </div>
        </header>

        {/* Shape Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '24px',
        }}>
          {SHAPE_ORDER.map((shapeId, i) => {
            const meta = SHAPE_META[shapeId];
            return (
              <motion.div
                key={shapeId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.06, y: -6 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(`/draw/${shapeId}`)}
                style={{
                  background: meta.gradient,
                  borderRadius: '24px',
                  padding: '32px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: `0 14px 36px ${meta.shadow}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Badge */}
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  background: 'rgba(255,255,255,0.25)',
                  borderRadius: '40px', padding: '3px 10px',
                  color: 'white', fontWeight: '800', fontSize: '0.7rem', letterSpacing: '0.05em',
                }}>
                  {meta.badge}
                </div>

                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{meta.emoji}</div>
                <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'white' }}>{meta.name}</h2>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DrawingMenuPage;
