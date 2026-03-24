import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Star, RefreshCw } from 'lucide-react';

const MAX_NUM = 10;

const generateQuestion = (mode) => {
  if (mode === 'addition') {
    const a = Math.floor(Math.random() * (MAX_NUM + 1));
    const b = Math.floor(Math.random() * (MAX_NUM - a + 1));
    return { a, b, op: '+', answer: a + b };
  } else {
    const a = Math.floor(Math.random() * (MAX_NUM + 1));
    const b = Math.floor(Math.random() * (a + 1));
    return { a, b, op: '-', answer: a - b };
  }
};

const generateChoices = (answer) => {
  const choices = new Set([answer]);
  while (choices.size < 4) {
    const offset = Math.floor(Math.random() * 5) - 2;
    const v = Math.max(0, answer + offset);
    choices.add(v);
  }
  return [...choices].sort(() => Math.random() - 0.5);
};

const EmojiRow = ({ count, emoji = '🌟' }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px', marginBottom: '12px', minHeight: '36px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ fontSize: '1.6rem' }}>{emoji}</span>
    ))}
  </div>
);

const MathGamePage = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const isAddition = mode === 'addition';

  const [question, setQuestion] = useState(() => generateQuestion(mode));
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
  const [total, setTotal] = useState(0);

  const newQuestion = useCallback(() => {
    const q = generateQuestion(mode);
    setQuestion(q);
    setChoices(generateChoices(q.answer));
    setSelected(null);
    setFeedback(null);
  }, [mode]);

  useEffect(() => {
    newQuestion();
  }, [mode]);

  const handleChoice = (val) => {
    if (feedback) return;
    setSelected(val);
    setTotal(t => t + 1);
    if (val === question.answer) {
      setFeedback('correct');
      setScore(s => s + 1);
      setStreak(s => s + 1);
      setTimeout(newQuestion, 1200);
    } else {
      setFeedback('wrong');
      setStreak(0);
      setTimeout(newQuestion, 1400);
    }
  };

  const color = isAddition ? '#10b981' : '#f43f5e';
  const shadow = isAddition ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)';
  const title = isAddition ? 'Addition ➕' : 'Subtraction ➖';

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '700px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <motion.button whileHover={{ x: -5 }} onClick={() => navigate('/math')} className="glass"
          style={{ padding: '12px 24px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', border: 'none', color: 'var(--text)' }}>
          <ChevronLeft size={20} /> Back
        </motion.button>
        <h1 style={{ fontSize: '2.2rem', color, margin: 0 }}>{title}</h1>
        <div className="glass" style={{ padding: '12px 24px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontWeight: '900', fontSize: '1.1rem' }}>⭐ {score}/{total}</span>
          {streak >= 3 && <span style={{ fontWeight: '900', fontSize: '1rem', color: '#fbbf24' }}>🔥 {streak}</span>}
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div key={`${question.a}-${question.op}-${question.b}`}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.35 }}
          style={{ width: '100%', maxWidth: '600px' }}
        >
          <div className="glass" style={{ borderRadius: '32px', padding: '48px 40px', textAlign: 'center', boxShadow: `0 20px 60px ${shadow}`, marginBottom: '36px' }}>
            {/* Visual counting aid */}
            <EmojiRow count={question.a} emoji={isAddition ? '🍎' : '🍬'} />
            {isAddition && <EmojiRow count={question.b} emoji="🍊" />}

            <div style={{ fontSize: '4.5rem', fontWeight: '900', color, margin: '16px 0', fontFamily: 'var(--font-display)' }}>
              {question.a} {question.op} {question.b} = ?
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div key={feedback} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  style={{ fontSize: '3rem', marginTop: '8px' }}>
                  {feedback === 'correct' ? '🎉 Correct!' : '😅 Try next!'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Answer Choices */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {choices.map((val) => {
              const isCorrect = val === question.answer;
              const isSelected = val === selected;
              let bg = 'rgba(255,255,255,0.85)';
              if (feedback && isSelected) bg = feedback === 'correct' ? '#10b981' : '#f43f5e';
              if (feedback && isCorrect && !isSelected) bg = '#10b981';

              return (
                <motion.button key={val}
                  whileHover={!feedback ? { scale: 1.06, y: -4 } : {}}
                  whileTap={!feedback ? { scale: 0.95 } : {}}
                  onClick={() => handleChoice(val)}
                  style={{
                    padding: '28px 16px',
                    borderRadius: '24px',
                    fontSize: '3rem',
                    fontWeight: '900',
                    border: `3px solid ${(feedback && (isSelected || isCorrect)) ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
                    background: bg,
                    color: (feedback && (isSelected || isCorrect)) ? 'white' : 'var(--text)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    cursor: feedback ? 'default' : 'pointer',
                    fontFamily: 'var(--font-display)',
                    transition: 'background 0.3s',
                  }}
                >
                  {val}
                </motion.button>
              );
            })}
          </div>

          {/* New question button */}
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={newQuestion}
              style={{ background: 'transparent', border: `2px solid ${color}`, color, padding: '12px 28px', borderRadius: '20px', fontSize: '1rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={18} /> Skip
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MathGamePage;
