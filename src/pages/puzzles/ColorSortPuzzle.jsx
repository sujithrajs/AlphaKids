import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const COLOR_BUCKETS = [
  { color: '#f43f5e', label: 'Red', emoji: '🔴' },
  { color: '#6366f1', label: 'Blue', emoji: '🔵' },
  { color: '#10b981', label: 'Green', emoji: '🟢' },
  { color: '#f59e0b', label: 'Yellow', emoji: '🟡' },
];

// A round consists of a random blob color to sort
const getQuestion = () => {
  const bucket = COLOR_BUCKETS[Math.floor(Math.random() * COLOR_BUCKETS.length)];
  return { target: bucket };
};

// Shuffle the bucket options
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const ColorSortPuzzle = ({ score, setScore, total, setTotal }) => {
  const [question, setQuestion] = useState(getQuestion);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [buckets] = useState(() => shuffle([...COLOR_BUCKETS]));

  const nextQuestion = useCallback(() => {
    setQuestion(getQuestion());
    setSelected(null);
    setFeedback(null);
  }, []);

  const handlePick = (bucket) => {
    if (feedback) return;
    setSelected(bucket.label);
    setTotal(t => t + 1);
    if (bucket.label === question.target.label) {
      setFeedback('correct');
      setScore(s => s + 1);
      setTimeout(nextQuestion, 1200);
    } else {
      setFeedback('wrong');
      setTimeout(nextQuestion, 1400);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={question.target.label}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {/* Blob to sort */}
          <div className="glass" style={{ borderRadius: '32px', padding: '48px 28px', textAlign: 'center', marginBottom: '32px', boxShadow: '0 20px 60px rgba(245,158,11,0.12)' }}>
            <p style={{ color: 'var(--text-muted)', fontWeight: '700', fontSize: '1rem', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Put this blob in the right bucket!
            </p>

            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '40% 60% 55% 45% / 45% 55% 60% 40%',
                background: question.target.color,
                margin: '0 auto',
                boxShadow: `0 20px 50px ${question.target.color}66`,
                border: '5px solid white',
              }}
            />

            <AnimatePresence>
              {feedback && (
                <motion.div key={feedback} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  style={{ fontSize: '2.2rem', marginTop: '18px' }}>
                  {feedback === 'correct' ? '🎉 Correct bucket!' : '😅 Wrong bucket!'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bucket options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {buckets.map((bucket) => {
              const isCorrect = bucket.label === question.target.label;
              const isSelected = bucket.label === selected;
              let borderColor = 'rgba(0,0,0,0.08)';
              let overlay = 'transparent';
              if (feedback && isSelected) overlay = feedback === 'correct' ? '#10b981' : '#f43f5e';
              if (feedback && isCorrect && !isSelected) overlay = '#10b981';

              return (
                <motion.button
                  key={bucket.label}
                  whileHover={!feedback ? { scale: 1.07, y: -4 } : {}}
                  whileTap={!feedback ? { scale: 0.94 } : {}}
                  onClick={() => handlePick(bucket)}
                  style={{
                    padding: '28px 16px',
                    borderRadius: '24px',
                    fontSize: '1.3rem',
                    fontWeight: '900',
                    fontFamily: 'var(--font-display)',
                    border: `3px solid ${(feedback && (isSelected || isCorrect)) ? 'transparent' : borderColor}`,
                    background: (feedback && (isSelected || isCorrect)) ? overlay : 'rgba(255,255,255,0.85)',
                    color: (feedback && (isSelected || isCorrect)) ? 'white' : 'var(--text)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    cursor: feedback ? 'default' : 'pointer',
                    transition: 'background 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  {/* Mini bucket visual */}
                  <div style={{
                    width: '48px', height: '48px',
                    borderRadius: '12px',
                    background: bucket.color,
                    boxShadow: `0 4px 12px ${bucket.color}55`,
                    border: '3px solid white',
                  }} />
                  {bucket.label}
                </motion.button>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextQuestion}
              style={{ background: 'transparent', border: '2px solid #f59e0b', color: '#f59e0b', padding: '12px 28px', borderRadius: '20px', fontSize: '1rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <RefreshCw size={18} /> Skip
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ColorSortPuzzle;
