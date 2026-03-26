import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const WORDS = [
  { word: 'Cat', emoji: '🐱', distractors: ['🐶', '🐭', '🐰'] },
  { word: 'Dog', emoji: '🐶', distractors: ['🐱', '🦊', '🐻'] },
  { word: 'Apple', emoji: '🍎', distractors: ['🍌', '🍇', '🍊'] },
  { word: 'Sun', emoji: '☀️', distractors: ['🌙', '⭐', '🌈'] },
  { word: 'House', emoji: '🏠', distractors: ['🚗', '⛵', '✈️'] },
  { word: 'Fish', emoji: '🐠', distractors: ['🐢', '🦋', '🐝'] },
  { word: 'Ball', emoji: '⚽', distractors: ['🎸', '🎲', '🎪'] },
  { word: 'Tree', emoji: '🌳', distractors: ['🌸', '🍄', '🌾'] },
  { word: 'Star', emoji: '⭐', distractors: ['🌙', '☀️', '🌈'] },
  { word: 'Boat', emoji: '⛵', distractors: ['✈️', '🚂', '🚗'] },
  { word: 'Cake', emoji: '🎂', distractors: ['🍕', '🍪', '🍩'] },
  { word: 'Frog', emoji: '🐸', distractors: ['🦎', '🐢', '🐍'] },
  { word: 'Bear', emoji: '🐻', distractors: ['🦁', '🐯', '🐼'] },
  { word: 'Moon', emoji: '🌙', distractors: ['☀️', '⭐', '🌈'] },
  { word: 'Bird', emoji: '🐦', distractors: ['🦋', '🐝', '🐠'] },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const getQuestion = () => {
  const item = WORDS[Math.floor(Math.random() * WORDS.length)];
  const options = shuffle([item.emoji, ...item.distractors.slice(0, 3)]);
  return { word: item.word, answer: item.emoji, options };
};

const WordMatchPuzzle = ({ score, setScore, total, setTotal }) => {
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
          key={question.word}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {/* Word card */}
          <div className="glass" style={{ borderRadius: '32px', padding: '48px 40px', textAlign: 'center', marginBottom: '32px', boxShadow: '0 20px 60px rgba(99,102,241,0.15)' }}>
            <p style={{ color: 'var(--text-muted)', fontWeight: '700', fontSize: '1rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Find the picture for…
            </p>
            <div style={{ fontSize: '4rem', fontWeight: '900', color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
              {question.word}
            </div>
            <AnimatePresence>
              {feedback && (
                <motion.div key={feedback} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  style={{ fontSize: '2.2rem', marginTop: '14px' }}>
                  {feedback === 'correct' ? '🎉 Correct!' : '😅 Not quite!'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {question.options.map((opt) => {
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
                    padding: '28px 16px',
                    borderRadius: '24px',
                    fontSize: '3.5rem',
                    border: `3px solid ${(feedback && (isSelected || isCorrect)) ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
                    background: bg,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    cursor: feedback ? 'default' : 'pointer',
                    transition: 'background 0.3s',
                    lineHeight: 1,
                  }}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextQuestion}
              style={{ background: 'transparent', border: '2px solid var(--primary)', color: 'var(--primary)', padding: '12px 28px', borderRadius: '20px', fontSize: '1rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <RefreshCw size={18} /> Skip
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WordMatchPuzzle;
