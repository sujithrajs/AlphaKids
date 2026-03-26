import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Star } from 'lucide-react';
import WordMatchPuzzle from './puzzles/WordMatchPuzzle';
import PatternPuzzle from './puzzles/PatternPuzzle';
import CountingPuzzle from './puzzles/CountingPuzzle';
import ColorSortPuzzle from './puzzles/ColorSortPuzzle';

const META = {
  wordmatch: { title: 'Word Match 🔤', color: '#6366f1', shadow: 'rgba(99,102,241,0.25)' },
  pattern: { title: 'Pattern Puzzle 🔮', color: '#f43f5e', shadow: 'rgba(244,63,94,0.25)' },
  counting: { title: 'Counting Fun 🔢', color: '#10b981', shadow: 'rgba(16,185,129,0.25)' },
  colorsort: { title: 'Color Sort 🎨', color: '#f59e0b', shadow: 'rgba(245,158,11,0.25)' },
};

const PUZZLE_MAP = {
  wordmatch: WordMatchPuzzle,
  pattern: PatternPuzzle,
  counting: CountingPuzzle,
  colorsort: ColorSortPuzzle,
};

const PuzzleGamePage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const meta = META[type] || { title: 'Puzzle', color: '#6366f1', shadow: 'rgba(99,102,241,0.25)' };
  const PuzzleComponent = PUZZLE_MAP[type];

  if (!PuzzleComponent) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <div style={{ fontSize: '4rem' }}>🤔</div>
        <h2 style={{ color: 'var(--primary)' }}>Puzzle not found!</h2>
        <button onClick={() => navigate('/puzzles')} style={{ padding: '14px 28px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '20px', fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer' }}>
          Back to Puzzles
        </button>
      </div>
    );
  }

  const streak = score >= 3 ? score : 0;

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '700px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '42px', flexWrap: 'wrap', gap: '16px' }}>
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate('/puzzles')}
          className="glass"
          style={{ padding: '12px 24px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', border: 'none', color: 'var(--text)', cursor: 'pointer' }}
        >
          <ChevronLeft size={20} /> Back
        </motion.button>

        <h1 style={{ fontSize: '2rem', color: meta.color, margin: 0 }}>{meta.title}</h1>

        <div className="glass" style={{ padding: '12px 24px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontWeight: '900', fontSize: '1.1rem' }}>⭐ {score}/{total}</span>
          {streak >= 3 && <span style={{ fontWeight: '900', fontSize: '1rem', color: '#fbbf24' }}>🔥 {streak}</span>}
        </div>
      </div>

      {/* Puzzle */}
      <PuzzleComponent score={score} setScore={setScore} total={total} setTotal={setTotal} />
    </div>
  );
};

export default PuzzleGamePage;
