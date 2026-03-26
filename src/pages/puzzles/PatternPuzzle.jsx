import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const PATTERNS = [
  { seq: ['🌟', '🌙', '🌟', '🌙', '❓'], answer: '🌟', opts: ['🌟', '🌙', '☀️', '⭐'] },
  { seq: ['🍎', '🍊', '🍎', '🍊', '❓'], answer: '🍎', opts: ['🍌', '🍎', '🍊', '🍇'] },
  { seq: ['🐱', '🐶', '🐱', '🐶', '❓'], answer: '🐱', opts: ['🐱', '🐭', '🐶', '🐰'] },
  { seq: ['🔴', '🔵', '🔴', '🔵', '❓'], answer: '🔴', opts: ['🟡', '🔴', '🔵', '🟢'] },
  { seq: ['🌸', '🌿', '🌸', '🌿', '❓'], answer: '🌸', opts: ['🌸', '🌿', '🌻', '🍀'] },
  { seq: ['🚗', '✈️', '🚗', '✈️', '❓'], answer: '🚗', opts: ['🚗', '⛵', '✈️', '🚂'] },
  { seq: ['🎵', '🎶', '🎵', '🎶', '❓'], answer: '🎵', opts: ['🎵', '🎶', '🎸', '🥁'] },
  { seq: ['🐸', '🦋', '🐸', '🦋', '❓'], answer: '🐸', opts: ['🐝', '🦋', '🐸', '🐢'] },
  { seq: ['🍕', '🍔', '🍕', '🍔', '❓'], answer: '🍕', opts: ['🍕', '🍔', '🌮', '🍜'] },
  { seq: ['⚡', '🌊', '⚡', '🌊', '❓'], answer: '⚡', opts: ['🌪️', '🌊', '⚡', '🔥'] },
  // 3-step patterns
  { seq: ['🔺', '🔷', '🔺', '🔷', '❓'], answer: '🔺', opts: ['🔺', '🔷', '🔸', '🔹'] },
  { seq: ['🐣', '🐥', '🐣', '🐥', '❓'], answer: '🐣', opts: ['🐣', '🐥', '🦆', '🐓'] },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const getQuestion = () => {
  const p = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
  return { ...p, opts: shuffle(p.opts) };
};

const PatternPuzzle = ({ score, setScore, total, setTotal }) => {
  const [question, setQuestion] = useState(getQuestion);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const nextQuestion = useCallback(() => {
    setQuestion(getQuestion());
    setSelected(null);
    setFeedback(null);
  }, []);

  const handlePick = (opt) => {
    if (feedback) return;
    setSelected(opt);
    setTotal(t => t + 1);
    if (opt === question.answer) {
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
          key={question.seq.join('')}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {/* Pattern display */}
          <div className="glass" style={{ borderRadius: '32px', padding: '48px 28px', textAlign: 'center', marginBottom: '32px', boxShadow: '0 20px 60px rgba(244,63,94,0.12)' }}>
            <p style={{ color: 'var(--text-muted)', fontWeight: '700', fontSize: '1rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              What comes next?
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {question.seq.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.08 }}
                  style={{
                    fontSize: item === '❓' ? '3rem' : '2.8rem',
                    width: '68px', height: '68px',
                    background: item === '❓' ? 'var(--primary)' : 'rgba(255,255,255,0.9)',
                    borderRadius: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    color: item === '❓' ? 'white' : undefined,
                    fontWeight: '900',
                    border: item === '❓' ? 'none' : '2px solid rgba(0,0,0,0.06)',
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
            <AnimatePresence>
              {feedback && (
                <motion.div key={feedback} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  style={{ fontSize: '2.2rem', marginTop: '18px' }}>
                  {feedback === 'correct' ? '🎉 Correct!' : '😅 Not quite!'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {question.opts.map((opt) => {
              const isCorrect = opt === question.answer;
              const isSelected = opt === selected;
              let bg = 'rgba(255,255,255,0.85)';
              if (feedback && isSelected) bg = feedback === 'correct' ? '#10b981' : '#f43f5e';
              if (feedback && isCorrect && !isSelected) bg = '#10b981';
              return (
                <motion.button
                  key={opt}
                  whileHover={!feedback ? { scale: 1.07, y: -4 } : {}}
                  whileTap={!feedback ? { scale: 0.94 } : {}}
                  onClick={() => handlePick(opt)}
                  style={{
                    padding: '28px 16px', borderRadius: '24px', fontSize: '3.2rem',
                    border: `3px solid ${(feedback && (isSelected || isCorrect)) ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
                    background: bg, boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    cursor: feedback ? 'default' : 'pointer', transition: 'background 0.3s', lineHeight: 1,
                  }}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextQuestion}
              style={{ background: 'transparent', border: '2px solid #f43f5e', color: '#f43f5e', padding: '12px 28px', borderRadius: '20px', fontSize: '1rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <RefreshCw size={18} /> Skip
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PatternPuzzle;
