import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { SHAPE_META, SHAPE_CATEGORIES } from '../utils/shapePaths';

const DrawingMenuPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', padding: '60px 20px 80px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '52px', flexWrap: 'wrap' }}>
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

        {/* Categories */}
        {SHAPE_CATEGORIES.map((cat, catIdx) => (
          <div key={cat.id} style={{ marginBottom: '52px' }}>

            {/* Category heading */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: catIdx * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <span style={{ fontSize: '2rem' }}>{cat.emoji}</span>
              <h2 style={{
                fontSize: '1.8rem',
                color: 'var(--text)',
                margin: 0,
              }}>
                {cat.label}
              </h2>
              <div style={{
                flex: 1,
                height: '2px',
                background: 'linear-gradient(90deg, rgba(99,102,241,0.2) 0%, transparent 100%)',
                borderRadius: '4px',
              }} />
            </motion.div>

            {/* Shape cards for this category */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '18px',
            }}>
              {cat.shapes.map((shapeId, i) => {
                const meta = SHAPE_META[shapeId];
                const globalDelay = catIdx * 0.1 + i * 0.06;
                return (
                  <motion.div
                    key={shapeId}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: globalDelay }}
                    whileHover={{ scale: 1.07, y: -6 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => navigate(`/draw/${shapeId}`)}
                    style={{
                      background: meta.gradient,
                      borderRadius: '22px',
                      padding: '28px 16px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: `0 12px 32px ${meta.shadow}`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Badge */}
                    <div style={{
                      position: 'absolute', top: '10px', right: '10px',
                      background: 'rgba(255,255,255,0.25)',
                      borderRadius: '40px', padding: '3px 9px',
                      color: 'white', fontWeight: '800',
                      fontSize: '0.65rem', letterSpacing: '0.04em',
                    }}>
                      {meta.badge}
                    </div>

                    <div style={{ fontSize: '2.6rem', marginBottom: '10px' }}>{meta.emoji}</div>
                    <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'white', fontWeight: '800' }}>
                      {meta.name}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawingMenuPage;
