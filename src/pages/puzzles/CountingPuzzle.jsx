import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const EMOJI_SETS = [
  { emoji: '🍎', label: 'apples' },
  { emoji: '⭐', label: 'stars' },
  { emoji: '🐱', label: 'cats' },
  { emoji: '🌸', label: 'flowers' },
  { emoji: '🚗', label: 'cars' },
  { emoji: '🍕', label: 'pizzas' },
  { emoji: '🦋', label: 'butterflies' },
  { emoji: '🎈', label: 'balloons' },
  { emoji: '🐸', label: 'frogs' },
  { emoji: '🍰', label: 'cakes' },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const getQuestion = () => {
  const set = EMOJI_SETS[Math.floor(Math.random() * EMOJI_SETS.length)];
  const count = Math.floor(Math.random() * 8) + 2; // 2–9
  const answer = count;
  const opts = new Set([answer]);
  while (opts.size < 4) {
    const offset = Math.floor(Math.random() * 5) - 2;
    const v = Math.max(1, answer + offset);
    if (v !== answer) opts.add(v);
  }
  return { emoji: set.emoji, label: set.label, count, answer, opts: shuffle([...opts]) };
};

const CountingPuzzle = ({ score, setScore, total, setTotal }) => {
  const [question, setQuestion] = useState(getQuestion);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const nextQuestion = useCallback(() => {
    setQuestion(getQuestion());
    setSelected(null);
    setFeedback(null);
  }, []);

  const handlePick = (val) => {
    if (feedback) return;
    setSelected(val);
    setTotal(t => t + 1);
    if (val === question.answer) {
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
          key={`${question.emoji}-${question.count}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {/* Counting display */}
          <div className="glass" style={{ borderRadius: '32px', padding: '40px 28px', textAlign: 'center', marginBottom: '32px', boxShadow: '0 20px 60px rgba(16,185,129,0.12)' }}>
            <p style={{ color: 'var(--text-muted)', fontWeight: '700', fontSize: '1rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              How many {question.label}?
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '8px', padding: '0 12px' }}>
              {Array.from({ length: question.count }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 200 }}
                  style={{ fontSize: '2.4rem', display: 'inline-block' }}
                >
                  {question.emoji}
                </motion.span>
              ))}
            </div>
            <AnimatePresence>
              {feedback && (
                <motion.div key={feedback} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  style={{ fontSize: '2.2rem', marginTop: '14px' }}>
                  {feedback === 'correct' ? `🎉 Yes! ${question.answer}!` : `😅 It was ${question.answer}!`}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Number options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {question.opts.map((val) => {
              const isCorrect = val === question.answer;
              const isSelected = val === selected;
              let bg = 'rgba(255,255,255,0.85)';
              if (feedback && isSelected) bg = feedback === 'correct' ? '#10b981' : '#f43f5e';
              if (feedback && isCorrect && !isSelected) bg = '#10b981';
              return (
                <motion.button
                  key={val}
                  whileHover={!feedback ? { scale: 1.07, y: -4 } : {}}
                  whileTap={!feedback ? { scale: 0.94 } : {}}
                  onClick={() => handlePick(val)}
                  style={{
                    padding: '28px 16px', borderRadius: '24px', fontSize: '3rem', fontWeight: '900',
                    fontFamily: 'var(--font-display)',
                    border: `3px solid ${(feedback && (isSelected || isCorrect)) ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
                    background: bg, color: (feedback && (isSelected || isCorrect)) ? 'white' : 'var(--text)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    cursor: feedback ? 'default' : 'pointer', transition: 'background 0.3s',
                  }}
                >
                  {val}
                </motion.button>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextQuestion}
              style={{ background: 'transparent', border: '2px solid #10b981', color: '#10b981', padding: '12px 28px', borderRadius: '20px', fontSize: '1rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <RefreshCw size={18} /> Skip
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CountingPuzzle;
